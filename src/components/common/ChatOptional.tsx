import React from "react";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const icons = [
  <SentimentSatisfiedRoundedIcon style={{ width: "24px", height: "24px" }} />,
  <ReplyIcon style={{ width: "24px", height: "24px" }} />,
  <MoreHorizIcon style={{ width: "24px", height: "24px" }} />,
];

const ChatOptional = () => {
  return (
    <div className="flex flex-row">
      {icons.map((icon, i) => (
        <button
          key={i}
          className="w-[28px] h-[28px] px-[1px] border-none bg-focusHover cursor-pointer hover:bg-focusColor shadow-custom"
        >
          <div className="w-[24px] h-[24px] text-text hover:text-white" key={icon.type.name}>
            {icon}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatOptional;
