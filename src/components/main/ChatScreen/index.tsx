import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/configs/axios";
import useUserStore from "@/store/userStore";
import { Helmet } from "react-helmet";
import UserProfile from "./UserProfile";
import NavbarChat from "@/components/main/FriendScreen/NavbarChat";
import ChatBox from "./ChatBox";

interface Props {
  userId: any;
}

export const ChatScreen = ({ userId }: Props) => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<any>();
  const [recipient, setRecipient] = useState<any>();
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const user = useUserStore((store) => store.user);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const { data } = await axiosInstance.get(
          `conversation/conversations?conversationId=${conversationId}`
        );
        const conversationBySender = data.filter(
          (conversation: any) => conversation?.recipient._id !== user.id
        );
        setConversation(conversationBySender[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user?.id, conversationId]);

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
        <title>{`Discord | ${conversation?.recipient.username}`}</title>
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