import React, { useEffect, useState, useRef } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { axiosInstance } from "@/configs/axios";
import useUserStore from "@/store/userStore";
import { Socket, io } from "socket.io-client";
import CustomTooltip from "./Tooltip";
import { socketUrl } from "@/components/main/MainLayout/index";

const textOverflow = "whitespace-nowrap text-ellipsis overflow-hidden";

interface ButtonsProps {
  index: number;
  title: string;
  isShown: boolean;
  icon: any;
}

const Buttons = ({ index, title, isShown = false, icon }: ButtonsProps) => {
  return (
    <CustomTooltip
      key={index}
      title={
        <div className="text-[14px] px-[5px] py-[5px] font-custom">{title}</div>
      }
      placement="top"
      arrow
    >
      <div
        className={`w-[36px] h-[36px] cursor-pointer rounded-full text-label flex items-center justify-center ml-[10px] ${
          isShown ? "bg-black" : "bg-[#2B2D31]"
        }`}
      >
        {icon}
      </div>
    </CustomTooltip>
  );
};

interface RequestCardProps {
  friendRequest: {
    _id: string;
    sender: {
      _id: string;
      username: string;
      usernameCode: number;
      avatar: string;
    };
    recipient: {
      _id: string;
      username: string;
      usernameCode: number;
      avatar: string;
    };
    status: string;
    __v: number;
  };
  isSender: boolean;
  socket: any;
}

export const RequestCard = ({
  friendRequest,
  socket,
  isSender = false,
}: RequestCardProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const requestList = useUserStore((store) => store.requestList);
  const user = useUserStore((store) => store.user)
  const updateRequestList = useUserStore((store) => store.updateRequestList);
  const { _id, sender, recipient } = friendRequest;
  const socketRef = useRef<typeof socket>(socket);
  
  useEffect(() => {
    socketRef.current = io(`${socketUrl}`, {
      transports: ["websocket"],
    });
    socketRef.current.emit("join app", user?.id);

    return () => {
      socketRef.current.disconnect();
    };
  }, [user?.id]);

  //Accept Friend Request
  const handleAcceptFR = async () => {
    const data = {
      requestId: _id,
    };
    try {
      const response = await axiosInstance.post(
        "friend/friend-request/accept",
        data
      );
      socketRef.current.emit("remove request", friendRequest);
      socketRef.current.emit("receive conversations", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectOrCancelFR = async () => {
    const data = {
      requestId: _id,
    };
    try {
      const response = await axiosInstance.post(
        "friend/friend-request/reject",
        data
      );
      socketRef.current.emit("remove request", friendRequest);
      updateRequestList(friendRequest._id)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="opacity-100 flex flex-row ml-[30px] mr-[20px] box-border">
        <div className="box-border w-full h-[1px] bg-[#82838d7a]"></div>
      </div>
      <div className="h-[62px] opacity-100 flex flex-row ml-[30px] mr-[20px] font-medium text-[16px] leading-[20px] overflow-hidden box-border cursor-pointer hover:bg-[#4E50584C]  rounded-[10px]">
        <div
          className="flex flex-grow items-center justify-between max-w-full rounded-[10px]"
          onMouseOver={() => setIsShown(true)}
          onMouseOut={() => setIsShown(false)}
        >
          <div className="flex overflow-hidden ml-[8px]">
            <div className="w-[32px] h-[32px] mr-[12px] flex-shrink-0 relative ">
              <img
                className="w-full h-full object-cover rounded-full"
                src={isSender ? recipient.avatar : sender.avatar}
                alt=""
              />
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <div className="flex overflow-hidden flex-grow items-end">
                <span
                  className={`${textOverflow} leading-[16px] text-white font-semibold block`}
                >
                  {isSender ? recipient?.username : sender?.username}
                </span>
                <span
                  className={`text-[14px] leading-[16px] text-label ${
                    isShown ? "visible" : "invisible"
                  }`}
                >
                  #{isSender ? recipient?.usernameCode : sender?.usernameCode}
                </span>
              </div>
              <div className="text-[#B8B9BF] text-[12px]">
                <div className={`${textOverflow} text-[14px]`}>
                  {isSender ? "Outgoing" : "Incoming"} Friend Request
                </div>
              </div>
            </div>
          </div>
          <div className="ml-[8px] flex box-border justify-center items-center mr-[8px]">
            {isSender ? (
              <div role="button" onClick={handleRejectOrCancelFR}>
                <Buttons
                  index={0}
                  title="Cancel"
                  isShown={isShown}
                  icon={<ClearIcon style={{ width: "20px", height: "20px" }} />}
                />
              </div>
            ) : (
              <>
                <div role="button" onClick={handleAcceptFR}>
                  <Buttons
                    index={0}
                    title="Accept"
                    isShown={isShown}
                    icon={
                      <CheckIcon style={{ width: "20px", height: "20px" }} />
                    }
                  />
                </div>
                <div role="button" onClick={handleRejectOrCancelFR}>
                  <Buttons
                    index={1}
                    title="Decline"
                    isShown={isShown}
                    icon={
                      <ClearIcon style={{ width: "20px", height: "20px" }} />
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
