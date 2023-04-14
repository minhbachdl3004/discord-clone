import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomTooltip from "./Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const textOverflow = "whitespace-nowrap text-ellipsis overflow-hidden";

const icons = [
  {
    title: "Message",
    icon: <ChatBubbleIcon style={{ width: "20px", height: "20px" }} />,
  },
  {
    title: "More",
    icon: <MoreVertIcon style={{ width: "20px", height: "20px" }} />,
  },
];

interface PeopleCard {
  username: string;
  usernameCode: string;
  conversationId?: string;
  avatar: string;
}

export const PeopleCard = ({
  username,
  usernameCode,
  conversationId,
  avatar,
}: PeopleCard) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="opacity-100 flex flex-row ml-[30px] mr-[20px] box-border">
        <div className="box-border w-full h-[1px] bg-[#6161707a]"></div>
      </div>
      <div className="h-[62px] opacity-100 flex flex-row ml-[30px] mr-[20px] font-medium text-[16px] leading-[20px] overflow-hidden box-border cursor-pointer hover:bg-[#4E50584C] rounded-[10px]
      ">
        <div
          className="flex flex-grow items-center justify-between max-w-full rounded-[10px]"
          onMouseOver={() => setIsShown(true)}
          onMouseOut={() => setIsShown(false)}
        >
          <div className="flex overflow-hidden ml-[8px]">
            <div className="w-[32px] h-[32px] mr-[12px] flex-shrink-0 relative ">
              <img
                className="w-full h-full object-cover rounded-full"
                src={avatar}
                alt=""
              />
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <div className="flex overflow-hidden flex-grow items-end">
                <span
                  className={`${textOverflow} leading-[16px] text-white font-semibold block`}
                >
                  {username}
                </span>
                <span
                  className={`text-[14px] leading-[16px] text-label ${
                    isShown ? "visible" : "invisible"
                  }`}
                >
                  #{usernameCode}
                </span>
              </div>
              <div className="text-[#B8B9BF] text-[12px]">
                <div className={`${textOverflow} text-[14px]`}>Online</div>
              </div>
            </div>
          </div>
          <div className="flex box-border mx-[8px] gap-[10px]">
            {icons.map((icon, i) => (
              <CustomTooltip
                key={i}
                title={
                  <div className="text-[14px] px-[5px] py-[5px] font-custom">
                    {icon.title}
                  </div>
                }
                placement="top"
                arrow
              >
                <Link
                  to={`/channels/@me/${conversationId}`}
                  className={`w-[36px] h-[36px] rounded-full ${
                    isShown ? "bg-[#2B2D31]" : "bg-[#2B2D31]"
                  }`}
                >
                  <div
                    className={`w-[36px] h-[36px] cursor-pointer text-label flex items-center justify-center`}
                  >
                    {icon.icon}
                  </div>
                </Link>
              </CustomTooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
