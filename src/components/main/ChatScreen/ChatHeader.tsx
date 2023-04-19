import React, { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { axiosInstance } from "@/configs/axios";

interface Props {
  text: string;
  backgroundColor: string;
}

export const ButtonCustom = ({ text, backgroundColor }: Props) => {
  return (
    <button
      className={`${backgroundColor} text-white cursor-pointer mr-[8px] w-auto h-[24px] min-w-[52px] min-h-[24px] transition-all duration-200 rounded-[3px] border-none text-[14px] font-medium leading-[16px] py-[2px] px-[16px]`}
    >
      <div className="mx-auto whitespace-nowrap text-ellipsis overflow-hidden">
        {text}
      </div>
    </button>
  );
};

interface RecipientProps {
  username: string;
  usernameCode: string;
  avatar: string;
}

const ChatHeader = ({ status }: { status: string }) => {
  const recipientId = useUserStore((store) => store.recipientId);
  const [recipient, setRecipient] = useState<RecipientProps>();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axiosInstance.get(
          `user/search/id?userId=${recipientId}`
        );
        setRecipient(data);
      } catch (error) {
      }
    };
    getUserInfo();
  }, [recipientId]);

  return (
    <div className="m-[16px] flex flex-col justify-end">
      <div className="w-[80px] h-[80px]">
        {recipient?.avatar ? (
          <img
            className="w-full h-full object-cover rounded-full"
            src={`${recipient?.avatar}`}
            alt=""
          />
        ) : (
          <div className="animate-pulse rounded-full bg-text w-full h-full"></div>
        )}
      </div>
      <div className="text-white font-custom text-[32px] my-[8px] leading-[40px] text-left">
        {recipient?.username}
      </div>
      <div className="text-label text-left text-[16px] leading-[20px] font-custom font-normal outline-0">
        This is the beginning of your direct message history with{" "}
        <strong>@{recipient?.username}</strong>
        <div className="flex items-center mt-[16px]">
          <ButtonCustom
            text={"Remove Friend"}
            backgroundColor={"bg-[#4E5058] hover:bg-[#6D6F78]"}
          />
          <ButtonCustom
            text="Block"
            backgroundColor="bg-[#4E5058] hover:bg-[#6D6F78]"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
