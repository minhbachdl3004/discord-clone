import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
interface Props {
  icon?: any;
  name?: string;
  isSelected?: boolean;
  link?: string;
}

const Item = ({ icon, name, isSelected, link }: Props) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="relative max-w-[305px] ml-[8px] box-border rounded-[6px] list-none">
      <Link className="no-underline " to={`${link}`}>
        <div
          className="pr-[8px] h-[42px] text-text flex flex-shrink-0 box-border w-full justify-center items-center"
          onMouseOver={() => setIsShown(true)}
          onMouseOut={() => setIsShown(false)}
        >
          <div className={`flex justify-center items-center w-[32px] h-[32px] mr-[12px]
          ${isSelected ? "text-white" : "text-[#989AA2]"}`}>
            {icon}
          </div>
          <div className="whitespace-nowrap mt-[1px] text-ellipsis flex-grow overflow-hidden">
            <div className="flex justify-start items-center text-[16px] h-[20px]">
              <div
                className={`text-[16px] leading-[20px] font-medium ${
                  isSelected ? "text-[white]" : "text-[#989AA2]"
                } `}
              >
                {name ? name : ""}
              </div>
            </div>
          </div>
          {isShown && name !== "Friends" && (
            <div className="text-text hover:text-white" role="button">
              <ClearIcon style={{width: "18px", height: "18px"}} />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Item;
