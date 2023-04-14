import React, { useState, useEffect } from "react";
import { PeopleCard } from "@/components/common/PeopleCard";
import { axiosInstance } from "@/configs/axios";
import useUserStore from "@/store/userStore";
import UserScreen from "@/components/common/TabPeople";
import { Link } from "react-router-dom";

interface OnlineFriend {
  onlineFriends: any[];
}

const OnlineFriend = ({ onlineFriends }: OnlineFriend) => {
  return (
    <>
      {onlineFriends.map((friend, i) => (
        <Link className="no-underline" to={`${friend?.conversationId}`}>
          <PeopleCard
            key={i}
            username={friend?.recipient.username}
            usernameCode={friend?.recipient.usernameCode}
            conversationId={friend?.conversationId}
            avatar={`${friend?.recipient.avatar}`}
          />
        </Link>
      ))}
    </>
  );
};

const OnlineFriendList = () => {
  const user = useUserStore((store) => store.user);
  const [keyword, setKeyword] = useState<string>("");
  const [onlineFriends, setOnlineFriends] = useState<any[]>([]);
  const conversationList = useUserStore((store) => store.conversationList);
  const handleChange = (e: any) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    if (!keyword) {
      setOnlineFriends(conversationList);
      return;
    }
  }, [conversationList, keyword]);
  useEffect(() => {
    setOnlineFriends(
      conversationList?.filter((conversationList: any) =>
        conversationList?.recipient.username
          .toLowerCase()
          .includes(keyword.toLowerCase())
      )
    );
  }, [keyword]);

  return (
    <UserScreen
      tabName="Online"
      keyword={keyword}
      handleChange={handleChange}
      quantity={onlineFriends?.length}
      children={<OnlineFriend onlineFriends={onlineFriends} />}
    />
  );
};

export default OnlineFriendList;
