import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Login from '@/pages/Login/index'
import useUserStore from "@/store/userStore";
import { ChatScreen } from "@/components/main/ChatScreen";

const HomePage = () => {
  const { userId } = useParams();

  const navigate = useNavigate();

  const loadFromToken = useUserStore((state) => state.loadFromToken);

  const userToken = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    loadFromToken();
  }, []);

  if (!userToken) {
    return <Login />;
  }

  return (
    <div className="w-full max-w-full h-full flex flex-row flex-auto relative items-stretch">
      <ChatScreen userId={userId} />
    </div>
  );
};

export default HomePage;
