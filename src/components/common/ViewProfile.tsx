import React, { useState, useRef } from "react";
import useUserStore from "@/store/userStore";
import { HiOutlineUpload } from "react-icons/hi";
import { axiosInstance } from "@/configs/axios";
import {
  ChildComponent,
  UsernameComponent,
} from "@/components/main/EditProfile";
import { ChangeProfileModal } from "@/components/main/EditProfile/Modal";

const ViewProfile = () => {
  const user = useUserStore((store) => store.user);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const setToken = useUserStore((store) => store.setToken);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fileInputRef = useRef(null);
  const socket = useUserStore((store) => store.socket);
  const socketRef = useRef<typeof socket>(socket);

  const handleFileInputChange = async (event: any) => {
    const file = event.target.files[0];
    const formData = {
      userId: user.id,
      avatar: file,
    };

    try {
      setLoading(true);
      const response = await axiosInstance.put("user/avatar/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setToken(response?.data.accessToken);
      socketRef.current.emit("update profile", response?.data.updateProfile);
    } catch (error) {
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-grow justify-start items-center w-full bg-[#1E1F22] box-border rounded-[8px] z-99">
      <div
        className="absolute w-[90px] h-[90px] top-[100px] left-[20px] box-border border-[5px] border-solid rounded-full border-secondary cursor-pointer z-99 bg-[#1E1F22]"
        role="button"
        onMouseOver={() => setIsShown(true)}
        onMouseOut={() => setIsShown(false)}
      >
        {loading ? (
          <div className="animate-pulse rounded-full bg-label w-full h-full"></div>
        ) : (
          <img
            className="w-full h-full object-cover rounded-full"
            src={`${user?.avatar}`}
            alt=""
          />
        )}
        {isShown ? (
          <div className="absolute flex justify-center items-center right-[-5px] top-[-5px] w-[90px] h-[90px] rounded-full bg-customColor cursor-pointer text-white uppercase font-custom text-[7px]">
            <HiOutlineUpload style={{ width: "32", height: "32" }} />
          </div>
        ) : null}
        <input
          type="file"
          className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full"
          onChange={handleFileInputChange}
        />
      </div>
      <div className="w-full h-[120px] bg-[#E5D2CD] rounded-t-[8px] z-1"></div>
      <div className="w-full h-[72px] flex pt-[16px] pr-[16px] pl-[120px] box-border justify-between">
        <div>
          <span className="whitespace-nowrap text-ellipsis overflow-hidden text-[20px] text-white">
            {user?.username}
          </span>
          <span className="whitespace-nowrap text-ellipsis overflow-hidden text-[20px] text-[#B8B9BF]">
            #{user?.usernameCode}
          </span>
        </div>
        <button
          className="min-w-[60px] w-auto h-[32px] relative flex justify-center items-center bg-none border-none rounded-[3px] text-[14px] font-medium leading-[16px] py-[2px] px-[16px]  bg-[#5865F2] text-white cursor-pointer box-border hover:bg-[#4752C4]"
          onClick={handleOpen}
        >
          Change Password
        </button>
        <ChangeProfileModal
          title="Update Your Password"
          text="Enter your current password and a new password."
          open={open}
          handleClose={handleClose}
          inputFields={[
            {
              name: "currentPassword",
              label: "Current Password",
              type: "password",
              placeholder: "Current Password",
              isPassword: true,
            },
            {
              name: "newPassword",
              label: "New Password",
              type: "password",
              placeholder: "New Password",
              isPassword: true,
            },
          ]}
        />
      </div>
      <div className="flex flex-grow w-full px-[16px] pb-[16px] box-border">
        <div className="w-full relative h-auto flex-grow bg-[#2B2D31] rounded-[8px] mt-[20px] px-[16px] py-[16px]">
          <UsernameComponent
            heading="Username"
            username={user?.username}
            usernameCode={user?.usernameCode}
          />
          <ChildComponent
            heading="Email"
            isVerified={true}
            content={user?.email}
          />
          <ChildComponent
            heading="Phone Number"
            isVerified={false}
            content="You haven't added a phone number yet."
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
