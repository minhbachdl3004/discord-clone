import * as React from "react";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileCard from "./ProfileCard";
import CustomTooltip from "./Tooltip";

interface Props {
  username: string;
  usernameCode: string;
  avatar: string;
  onClick?: (e: any) => void;
}

export default function Profile({ username, usernameCode, avatar, onClick }: Props) {
  const trigger = (handleOpen: () => void) => (
    <button onClick={handleOpen}>Open Modal</button>
  );
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-[full] h-[52px] flex justify-between bg-secondary px-[8px]">
      <div
        className="flex items-center min-w-[120px] h-[39px] mt-[8px] ml-[-2px] pl-[2px] mr-[8px] cursor-pointer hover:bg-focusColor rounded-[4px]"
        role="button"
        onClick={handleOpen}
      >
        <div className="w-[32px] h-[32px]">
          <img
            className="w-full h-full rounded-full object-cover"
            src={avatar}
            alt=""
          />
        </div>
        <div className="flex-grow pb-[4px] pl-[8px] pt-[4px] mr-[4px] box-border">
          <div className="max-w-[90px] items-start font-custom text-[14px] leading-[18px] font-normal outline-none text-white flex-grow box-border">
            <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden leading-[18px] font-semibold text-left">
              {username}
            </div>
          </div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden text-label leading-[13px] text-[12px] text-left">
            #{usernameCode}
          </div>
        </div>
      </div>
      <div></div>
      <ProfileCard handleClose={handleClose} open={open} />
      <div className="mt-[10px] w-[32px] h-[32px] flex justify-center items-center text-text cursor-pointer hover:bg-[#4E505899] hover:text-white">
        <CustomTooltip
          title={
            <div className="text-[14px] px-[5px] py-[5px] font-custom">
              User Settings
            </div>
          }
          placement="top"
          arrow
        >
          <SettingsIcon style={{ width: "20px", height: "20px" }} />
        </CustomTooltip>
      </div>
    </div>
  );
}
