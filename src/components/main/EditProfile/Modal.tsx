import React, { useRef, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import Input from "@/components/common/Input";
import { axiosInstance } from "@/configs/axios";
import useUserStore from "@/store/userStore";
import BoucingLoader from "@/components/common/BoucingLoader";

const boxStyle = {
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: 440,
  height: 336,
  bgcolor: "#292B2F",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  boxSizing: "border-box",
  outline: "none",
  padding: 0,
};

const modalStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #36393F",
};

interface ChangeProfileModal {
  title: string;
  text: string;
  open: any;
  handleClose: any;
  inputFields: Array<{
    name: string;
    label: string;
    type: string;
    defaultValue?: string;
    placeholder: string;
    isPassword: boolean;
  }>;
}

export const ChangeProfileModal = ({
  title,
  text,
  open,
  handleClose,
  inputFields,
}: ChangeProfileModal) => {
  const btnClass =
    "h-[32px] w-[96px] relative flex justify-center items-center box-border bg-none border-none rounded-[3px] text-[14px] font-medium leading-[16px] py-[2px] px-[16px] cursor-pointer select-none";
  const [formData, setFormData] = useState<any>({});
  const user = useUserStore((store) => store.user);
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const setToken = useUserStore((store) => store.setToken);
  const socket = useUserStore((store) => store.socket);
  const socketRef = useRef<typeof socket>(socket);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (!open) {
      setFormData({});
    }
  }, [open]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/user/update/${user?.id}`,
        formData
      );
      setToken(response?.data.accessToken);
      socketRef.current.emit("update profile", response?.data.updateProfile);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
    formRef.current?.reset();
    setFormData({});
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalStyles}
    >
      <Box sx={boxStyle}>
        <div className="flex-0 flex flex-col items-center pt-[24px] pb-[24px] relative overflow-x-hidden">
          <div className="text-center font-bold text-[24px] leading-[30px] text-white">
            {title}
          </div>
          <div className="mt-[8px] text-[#B8B9BF] text-[16px] leading-[20px] font-normal">
            {text}
          </div>
        </div>
        <form
          className="w-full h-full box-border"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="pl-[16px] pr-[24px]">
            {inputFields &&
              inputFields.map((input, index) => (
                <Input
                  key={index}
                  type={input.type}
                  placeHolder={input.placeholder}
                  onChange={handleInputChange}
                  isPassword={input.isPassword}
                  value={formData[input.name] || ""}
                  name={input.name}
                  label={input.label}
                  width="w-[360px]"
                  marginLeft="0"
                  error={error.name === input.label ? error : ""}
                />
              ))}
          </div>
          <div className="bg-primary relative py-[16px] w-full box-border flex flex-row-reverse flex-nowrap justify-start items-stretch pr-[24px] outline-none">
            <button
              className={`loader text-white bg-[#5865F2] ${btnClass} hover:bg-[#4752C4]`}
            >
              {loading ? (
                <BoucingLoader />
              ) : (
                <div>Done</div>
              )}
            </button>
            <button
              className={`${btnClass} text-white bg-transparent hover:underline`}
              onClick={handleClose}
            >
              <div>Cancel</div>
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ChangeProfileModal;
