import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Chat from "./Chat";
import { Link, useParams } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import Item from "@/components/common/Item";
import AddIcon from "@mui/icons-material/Add";
import { axiosInstance } from "@/configs/axios";
import { io } from "socket.io-client";
import useUserStore from "@/store/userStore";
import { socketUrl } from "@/components/main/MainLayout/index";

export interface ListItem {
  id: number;
  name: string;
}

const list = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

interface Props {
  userId: string;
}

interface Recipient {
  _id: string;
  username: string;
  usernameCode: string;
  avatar: string;
}

const ChatList = ({ userId }: Props) => {
  const { conversationId } = useParams();
  const [showScrollbar, setShowScrollbar] = useState<boolean>(false);
  const [conversationList, setConversationList] = useState<any[]>([]);
  const containerRef = useRef(null);
  const socket = useUserStore((store) => store.socket);
  const socketRef = useRef<typeof socket>(socket);
  
  useEffect(() => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      setShowScrollbar(scrollHeight > clientHeight);
    }
  }, [list.length]);

  useEffect(() => {
    socketRef.current = io(`${socketUrl}`, {
      transports: ["websocket"],
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);

  const getConversation = async () => {
    try {
      const response = await axiosInstance.get(
        `conversation/conversations/all?userId=${userId}`
      );
      setConversationList(response.data);
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    socketRef.current.emit("join app", userId);
    getConversation();

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    socketRef.current.on("conversation responsed", (newConversation: any) => {
      setConversationList((prevList) => [...prevList, newConversation]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  useEffect(() => {
    socketRef.current.on("profile updated", (newProfile: any) => {
      getConversation();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  return (
    <>
      <div className="h-[8px]"></div>
      <div
        ref={containerRef}
        className={`flex flex-grow relative overflow-x-hidden overflow-y-scroll pl-[10px] scrollable-container box-border ${
          showScrollbar ? "show-scrollbar" : ""
        }`}
      >
        <List className="w-full bg-primary">
          <div
            className={`mb-[2px] ${
              conversationId === undefined
                ? "bg-focusColor hover:bg-secondary"
                : "bg-primary"
            } hover:bg-focusHover rounded-[4px]`}
            role="button"
          >
            <Item
              name="Friends"
              icon={<PeopleIcon style={{ width: "20px", height: "20px" }} />}
              isSelected={conversationId === undefined}
              link="/channels/@me"
            />
          </div>
          <h2 className="flex py-[18px] pr-[8px] pl-[4px] h-[40px] box-border text-ellipsis whitespace-nowrap overflow-hidden uppercase text-xl leading-[16px] tracking-[0.02em]font-semibold font-custom text-text">
            <span className="w-full h-[20px] flex self-start overflow-hidden flex-1 text-ellipsis">
              Direct Messages
            </span>
            <div className="cursor-pointer">
              <AddIcon
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
            </div>
          </h2>
          {conversationList && conversationList.map((conversation : any) => (
            <Chat
              key={conversation?.conversationId}
              id={conversation?.conversationId}
              name={conversation?.recipient?.username}
              icon={
                <img
                  src={`${conversation?.recipient?.avatar}`}
                  className="w-[32px] h-[32px] rounded-full"
                />
              }
              isSelected={conversation?.conversationId === conversationId}
            />
          ))}
        </List>
      </div>
    </>
  );
};

export default ChatList;
