import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useUserStore from "@/store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "@/configs/axios";
import { continueMessage } from "@/configs/ContinueMessage";
import { dividerForNewMessage } from "@/configs/Divider";
import { CircularProgress } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { socketUrl } from "@/components/main/MainLayout";
import SendIcon from '@mui/icons-material/Send';

interface ChatMessageProps {
  _id: string;
  conversationId: string | undefined;
  senderId: string;
  recipientId: string;
  message: string;
  images: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatBoxProps {
  senderId: string;
  recipientId: string;
  status: string;
}

const ChatBox = ({ senderId, recipientId, status }: ChatBoxProps) => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [message, setMessage] = useState<ChatMessageProps>({
    _id: "",
    conversationId: conversationId,
    senderId: senderId,
    recipientId: recipientId,
    message: "",
    images: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // const [socketConnected, setSocketConnected] = useState<boolean>(false);
  // const [typing, setTyping] = useState<boolean>(false);
  // const [istyping, setIsTyping] = useState<boolean>(false);
  const user = useUserStore((store) => store.user);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const socket = useUserStore((store) => store.socket);
  const socketRef = useRef<typeof socket>(socket);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<any>(null);

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prevState) => ({
      ...prevState,
      message: prevState.message + emoji.native,
    }));
  };

  const handleInput = (event: any) => {
    setMessage((prevState) => ({
      ...prevState,
      message: event.target.value,
    }));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFile = (event: any) => {
    const image = new Image();
    image.src = URL.createObjectURL(event.target.files[0]);
    setImages([...images, { id: files.length, src: image.src }]);
    setFiles([...files, { id: files.length, File: event.target.files[0] }]);
    setMessage((prevState) => ({
      ...prevState,
      images: [...files, { id: files.length, File: event.target.files[0] }],
    }));
  };
  console.log(files);

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            const image = new Image();
            image.onload = () => {
              // Do something with the image here
            };
            image.src = URL.createObjectURL(blob);
            const newId = images.length;
            setImages([...images, { id: newId, src: image.src }]);
            setFiles([...files, { id: newId, File: blob }]);
            setMessage((prevState) => ({
              ...prevState,
              images: [...files, { id: newId, File: blob }],
            }));
          }
        }
      }
    }
  };

  const handleRemove = (id: any) => {
    setImages(images.filter((image) => image.id !== id));
    setFiles(files.filter((file) => file.id !== id));
    setMessage((prevState) => ({
      ...prevState,
      images: prevState.images.filter((image) => image.id !== id),
    }));
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(event as React.FormEvent);
    }
  };

  useEffect(() => {
    setPage(1);
    setMessages([]);
  }, [conversationId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/message/conversation/${conversationId}?userId=${user.id}&page=1`
        );
        socketRef.current.emit("join room", conversationId);
        setMessages(data.messages.reverse());
        setTotalPages(data?.pagination.totalPages);
      } catch (error) {}
      setLoading(false);
    };
    fetchMessages();
  }, [conversationId]);

  const loadMoreMessages = async () => {
    if (!conversationId || page === totalPages) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/message/conversation/${conversationId}?userId=${user.id}&page=${
          page + 1
        }`
      );
      setMessages([...data.messages.reverse(), ...messages]);
      setTotalPages(data?.pagination.totalPages);
    } catch (error) {}
    setLoading(false);
    setPage(page + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current?.scrollTop === 0) {
        loadMoreMessages();
      }
    };
    divRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      divRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [conversationId, messages.length]);

  const handleSendMessage = async (event: any) => {
    event.preventDefault();
    if (message.message === "" && message.images.length === 0) {
      return;
    }
    try {
      const formData = new FormData();
      if (conversationId) {
        formData.append("conversationId", conversationId);
        formData.append("senderId", senderId);
        formData.append("recipientId", recipientId);
        formData.append("message", message.message);
        for (let i = 0; i < message.images.length; i++) {
          formData.append("images", message.images[i].File);
        }
        setMessage((prevState) => ({
          ...prevState,
          message: "",
          images: [],
        }));
        setImages([]);
        const { data } = await axiosInstance.post(
          "message/new-message",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        socketRef.current.emit("send message", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    socketRef.current = io(`${socketUrl}`, {
      transports: ["websocket"],
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages[messages.length - 1]?._id]);

  useEffect(() => {
    socketRef.current.on("receive message", (newMessageReceived: any) => {
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full bg-bgScreen">
        <CircularProgress />
      </div>
    );
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    const image = new Image();
    image.onload = () => {};
    image.src = URL.createObjectURL(file);
    const newId = images.length;
    setImages([...images, { id: newId, src: image.src }]);
    setFiles([...files, { id: newId, File: file }]);
    setMessage((prevState) => ({
      ...prevState,
      images: [...files, { id: newId, File: file }],
    }));
  };

  return (
    <div className="flex flex-col overflow-auto flex-grow">
      <div
        id="scroll"
        className="flex flex-col overflow-y-scroll flex-grow"
        ref={divRef}
      >
        <ChatHeader status={status} />
        <div className="flex flex-col">
          {messages.map((message, i) => (
            <div ref={lastMessageRef}>
              <Message
                key={i}
                messageInfo={message}
                message={message.message}
                isContinue={continueMessage(messages, message, i)}
                isDivider={dividerForNewMessage(messages, message, i)}
                images={message.images}
              />
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSendMessage}>
        <ChatInput
          message={message.message}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown}
          handleShowEmojiPicker={toggleEmojiPicker}
          showEmojiPicker={showEmojiPicker}
          handleInputEmoji={handleEmojiSelect}
          handlePaste={handlePaste}
          handleRemove={handleRemove}
          images={images}
          file={files}
          handleDrop={handleDrop}
          handleDrag={(event: any) => event.preventDefault()}
          handleUploadFile={handleUploadFile}
          handleClick={handleClick}
          fileInputRef={fileInputRef}
        />
      </form>
    </div>
  );
};

export default ChatBox;
