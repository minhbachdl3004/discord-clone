import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useUserStore from "@/store/userStore";
import { axiosInstance } from "@/configs/axios";

type userId = {
  userId: string | undefined;
};

export const TabAddFriend = ({ userId }: userId) => {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const socket = useUserStore((store) => store.socket);
  const socketRef = useRef<typeof socket>(socket);

  // useEffect(() => {
  //   socketRef.current = io("http://localhost:3000", {transports: ['websocket']});

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socketRef.current.disconnect();
  //   };

  // },[userId])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError("")
    setMessage("")
    setUsername(e.target.value)
  }

  const handleSendFriendRequest = async (event: any) => {
    event.preventDefault();
    const regex = /^[^#]+#[0-9]{4}$/;
    if (!regex.test(username)) {
      setError("Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct")
      return;
    }

    const friendRequest = {
      senderId: userId,
      recipientName: username,
    };

    try {
      const response = await axiosInstance.post(
        "friend/new-request",
        friendRequest
      );
      socketRef.current.emit("friend request sent", response.data.friendRequest);
      setMessage(response.data.message)
    } catch (error: any) {
      setError(error);
    }
    formRef.current?.reset();
  };

  return (
    <header className="flex-shrink flex-grow py-[20px] px-[30px] border-b-[1px] border-0 border-solid border-[#797c867a]">
      <h2 className="mb-[8px] text-white text-[16px] leading-[20px] uppercase font-semibold cursor-default font-custom text-left">
        Add Friend
      </h2>
      <form autoComplete="off" onSubmit={handleSendFriendRequest} ref={formRef}>
        <div className="text-text cursor-default text-[14px] leading-[20px] font-normal text-left">
          You can add a friend with their Discord Tag. It's cAsE-sEnSitIvE!
        </div>
        <div
          className={`flex items-center max-h-[50px] bg-black rounded-[8px] mt-[16px] px-[12px] relative focus-within:border-[1px] focus-within:border-blue-500 focus-within:border-solid box-border p-[10px] ${
            error
              ? "focus-within:border-red-500"
              : message
              ? "focus-within:border-green-500"
              : "focus-within:border-blue-500"
          }`}
        >
          <div className="bg-transparent border-none box-border text-label flex-auto mr-[16px]py-[4px] z-1 text-[16px] font-medium tracking-wider leading-[20px] whitespace-pre">
            <input
              type="text"
              className="text-[16px] font-medium tracking-wider leading-[20px] whitespace-pre h-[40px] bg-transparent text-white border-none w-full outline-none"
              placeholder="Enter a Username#0000"
              onChange={handleChange}
            />
          </div>
          <button
            className={`bg-[#5865f2] text-white w-auto h-[32px] min-w-[60px] min-h-[32px] rounded-[3px] relative flex justify-center items-center box-border bg-none border-none py-[2px] px-[16px]
            ${
              username !== ""
                ? "cursor-pointer "
                : " cursor-not-allowed opacity-50"
            }`}
          >
            <div className="mx-auto whitespace-nowrap text-ellipsis overflow-hidden">
              Send Friend Request
            </div>
          </button>
        </div>
        <div
          className={`mt-[8px] ${
            error ? "text-[#FA777C]" : `text-[#2DC770]`
          } cursor-default text-[14px] leading-[20px] font-normal text-left`}
        >
          {error ? error : message}
        </div>
      </form>
    </header>
  );
};
