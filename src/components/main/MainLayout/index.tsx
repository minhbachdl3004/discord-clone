import React, { useState, useEffect, useRef } from "react";
import useUserStore from "../../../store/userStore";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { io } from "socket.io-client";
import { axiosInstance } from "@/configs/axios";

export const socketUrl = import.meta.env.VITE_SOCKET_URL;
let socket = io(`${socketUrl}`);

const MainLayout = () => {
  const user = useUserStore((store) => store.user);
  const [loading, setLoading] = useState<boolean>(false);
  const setConversationList = useUserStore((store) => store.setConversationList);

  const getConversation = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `conversation/conversations/all?userId=${user?.id}`
      );
      console.log(response.data);
      setConversationList(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const socketRef = useRef<typeof socket>(socket);
  useEffect(() => {
    socketRef.current = io(`${socketUrl}`, { transports: ["websocket"] });
    useUserStore.setState({ socket: socketRef.current });

    socketRef.current.emit("join app", user?.id);
    // Clean up the socket connection when the component unmounts
    getConversation();
    return () => {
      socketRef.current.disconnect();
    };
  }, [user?.id]);

  const navigate = useNavigate();

  const loadFromToken = useUserStore((state) => state.loadFromToken);

  const userToken = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    loadFromToken();
  }, []);

  if (!userToken) {
    console.log("no userToken");
    navigate("/");
    return null;
  }

  if (loading) {
    return (
      <div className="absolute w-screen h-screen bg-bgScreen">
        <div className="relative w-full h-full flex flex-col justify-center items-center gap-[12px]">
          <img
            className="w-[80px] h-[80px] rounded-full object-cover"
            src="https://seeklogo.com/images/D/discord-white-logo-C1535032B8-seeklogo.com.png"
            alt=""
          />
          <div className="text-[16px] italic text-label uppercase">
            Roses are red violets are blue ryuu ga waga teki wo kurau!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full h-full flex flex-row">
      <Sidebar />
      <div className="w-full box-border">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
