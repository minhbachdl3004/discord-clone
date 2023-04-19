import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "@/configs/axios";
import useUserStore from "@/store/userStore";
import { io } from "socket.io-client";
import { RequestCard } from "@/components/common/RequestCard";
import UserScreen from "@/components/common/TabPeople";
import { socketUrl } from "@/components/main/MainLayout/index";

interface FriendRequestsProps {
  listRequests: any[];
  user: any;
  socketRef: any;
}

const FriendRequests = ({
  listRequests,
  user,
  socketRef,
}: FriendRequestsProps) => {
  return (
    <div>
      {listRequests?.map((request, i) => (
        <RequestCard
          key={i}
          friendRequest={request}
          isSender={user?.id === request?.sender._id}
          socket={socketRef}
        />
      ))}
    </div>
  );
};

const PendingList = () => {
  const user = useUserStore((store) => store.user);
  const requestList = useUserStore((store) => store.requestList);
  const [listRequests, setListRequests] = useState<any[]>([]);
  const updateRequestList = useUserStore((store) => store.updateRequestList);
  const socket = useUserStore((store) => store.socket);
  const socketRef = useRef<typeof socket>(socket);

  useEffect(() => {
    socketRef.current = io(`${socketUrl}`, {
      transports: ["websocket"],
    });
    
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const response = await axiosInstance.get(
          `friend/friend-requests/all?userId=${user?.id}`
        );
        useUserStore.setState({ requestList: response.data });
        socketRef.current.emit("join app", user?.id);
        setListRequests(response.data);
      } catch (error) {
      }
    };
    getFriendRequests();
  }, [user?.id]);

  useEffect(() => {
    socketRef.current.on("request responsed", (removedRequest: any) => {
      setListRequests((prevLists) =>
        prevLists.filter((request) => request._id !== removedRequest._id)
      );
    });
  }, [socketRef]);

  useEffect(() => {
    socketRef.current.on("friend request received", (newFriendRequest: any) => {
      setListRequests((prevLists) => [...prevLists, newFriendRequest]);
      useUserStore.setState({ requestList: listRequests });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [socketRef]);
  return (
    <UserScreen
      tabName="Pending"
      quantity={listRequests?.length}
      children={
        <FriendRequests
          user={user}
          listRequests={listRequests}
          socketRef={socketRef}
        />
      }
    />
  );
};

export default PendingList;
