import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "@/configs/axios";
import useUserStore from "@/store/userStore";
import { Helmet } from "react-helmet";
import UserProfile from "./UserProfile";
import NavbarChat from "@/components/main/FriendScreen/NavbarChat";
import ChatBox from "./ChatBox";

export const ChatScreen = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<any>();
  const [recipient, setRecipient] = useState<any>();
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const user = useUserStore((store) => store.user);

  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoading(true)
        const { data } = await axiosInstance.get(
          `conversation/conversations?conversationId=${conversationId}&userId=${user.id}`
        );
        setConversation(data[0]);
      } catch (error) {
        setError(error);
        console.log(error);
      }
      setLoading(false)
    };
    getConversation();
  }, [user?.id, conversationId]);

  if (error) {
    navigate('/channels/@me')
  }
  
  useEffect(() => {
    const getRecipientInfo = async () => {
      try {
        const { data } = await axiosInstance.get(
          `user/search/id?userId=${conversation?.recipient._id}`
        );
        setRecipient(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipientInfo();
  }, [conversation?.recipient._id]);

  console.log(recipient);

  useEffect(() => {
    useUserStore.setState({ recipientId: conversation?.recipient._id });
  }, [conversation?.recipient._id]);

  const handleShowUserProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <Helmet>
        <title>Discord {loading ? `Clone`: `| ${conversation?.recipient.username}`}</title>
      </Helmet>
      <main className="relative flex flex-col min-w-0 max-w-full box-border overflow-hidden z-0 flex-grow bg-bgScreen flex-auto">
        <NavbarChat
          onClick={handleShowUserProfile}
          name={conversation?.recipient.username}
          isShown={showProfile}
        />
        <div className="w-full h-full flex flex-row overflow-hidden">
          <ChatBox
            senderId={conversation?.sender._id}
            recipientId={conversation?.recipient._id}
            status={conversation?.status}
          />
          {showProfile ? <UserProfile recipient={recipient} /> : null}
        </div>
      </main>
    </>
  );
};
