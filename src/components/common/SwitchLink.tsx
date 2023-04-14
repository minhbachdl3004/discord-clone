import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import MySnackbar from "./SnackBar";
import BoucingLoader from "./BoucingLoader";

interface Props {
  text: string;
  message: string;
  link: string;
}

const SwitchLink = ({ text, message, link }: Props) => {
  return (
    <div className="flex text-[14px] text-left mt-[20px] px-[6px] gap-[5px]">
      <span className="text-text">{text}</span>
      <span className="font-bold">
        <Link
          className="no-underline text-[#0084ff] hover:underline"
          to={`/${link}`}
        >
          {message}
        </Link>
      </span>
    </div>
  );
};

interface ButtonSwitchLinkProps {
  text: string;
  message: string;
  status: string;
  loading?: boolean;
}

export const Button = ({
  text,
  message,
  status,
  loading,
}: ButtonSwitchLinkProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleShowSnackbar = (msg: string) => {
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={() => handleShowSnackbar(message)}
        className="w-full py-[8px] bg-[#5865F2] border-buttonColor text-white font-medium text-[16px] leading-[24px] mt-[15px] cursor-pointer outline-none border-none duration-200 relative hover:bg-[#4752C4] box-border rounded-[4px]"
      >
        {loading ? <BoucingLoader /> : text}
      </button>
    </>
  );
};

export default SwitchLink;
