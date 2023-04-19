import React, { useState } from "react";
import { ChangeProfileModal } from "./Modal";
import useUserStore from "@/store/userStore";

interface UsernameProps {
  heading: string;
  username?: string;
  usernameCode?: string;
}

export const UsernameComponent = ({
  heading,
  username = "",
  usernameCode = "",
}: UsernameProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useUserStore((store) => store.user);

  return (
    <div className="flex flex-row justify-between box-border">
      <div className="flex flex-col h-[40px] flex-auto overflow-hidden mr-[16px]">
        <div className="mb-[4px] box-border text-[12px] leading-[16px] font-bold uppercase tracking-[0.02em] text-[#B8B9BF]">
          {heading}
        </div>
        <div>
          <span className="overflow-hidden text-ellipsis box-border text-[#F3F4F5] text-[16px]">
            {username}
          </span>
          <span className="overflow-hidden text-ellipsis box-border text-[#B8B9BF] text-[16px]">
            #{usernameCode}
          </span>
        </div>
      </div>
      <div
        role="button"
        className="w-auto min-w-[60px] min-h-[32px] bg-[#4E5058] text-white overflow-hidden text-ellipsis my-auto flex justify-center items-center bg-none border-none rounded-[3px] text-[14px] font-medium leading-[16px] py-[2px] px-[4px] cursor-pointer hover:bg-[#6D6F78]"
        onClick={handleOpen}
      >
        Edit
      </div>
      <ChangeProfileModal
        title="Change your username"
        text="Enter a new username and your existing password."
        open={open}
        handleClose={handleClose}
        inputFields={[
          {
            name: "newUsername",
            label: "username",
            type: "text",
            placeholder: "Username",
            isPassword: false,
            defaultValue: `${user?.username}`,
          },
          {
            name: "currentPassword",  
            label: "Current Password",
            type: "password",
            placeholder: "Current Password",
            isPassword: true,
          },
        ]}
      />
    </div>
  );
};

interface EmailProps {
  heading: string;
  content: string;
  isVerified: boolean;
}

export const ChildComponent = ({
  heading,
  content,
  isVerified = false,
}: EmailProps) => {
  const [hiddenEmail, setHiddenEmail] = useState<boolean>(true);
  const [username, domain] = content.split("@");
  const maskedEmail = `${"*".repeat(username.length)}@${domain}`;
  return (
    <div className="flex flex-row justify-between box-border mt-[30px]">
      <div className="flex flex-col h-[40px] flex-auto overflow-hidden mr-[16px]">
        <div className="mb-[4px] box-border text-[12px] leading-[16px] font-bold uppercase tracking-[0.02em] text-[#B8B9BF]">
          {heading}
        </div>
        {isVerified ? (
          <div className="flex">
            <div className="overflow-hidden text-ellipsis box-border text-[#F3F4F5] text-[16px]">
              {hiddenEmail ? maskedEmail : content}
            </div>
            <div
              role="button"
              className="overflow-hidden text-ellipsis box-border cursor-pointer py-[2px] px-[4px] text-[#00A8FC] text-[14px] hover:underline mt-[-2px]"
              onClick={() => setHiddenEmail(!hiddenEmail)}
            >
              {hiddenEmail ? "Reveal" : "Hide"}
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="overflow-hidden text-ellipsis box-border text-[#F3F4F5] text-[16px]">
              {content}
            </div>
          </div>
        )}
      </div>
      <div
        role="button"
        className="w-auto min-w-[60px] min-h-[32px] bg-[#4E5058] text-white overflow-hidden text-ellipsis my-auto flex justify-center items-center bg-none border-none rounded-[3px] text-[14px] font-medium leading-[16px] py-[2px] px-[4px] cursor-pointer hover:bg-[#6D6F78]"
      >
        <div className="whitespace-nowrap text-ellipsis overflow-hidden box-border">
          {isVerified ? "Edit" : "Add"}
        </div>
      </div>
    </div>
  );
};
