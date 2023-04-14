import React from "react";
import { Search } from "@material-ui/icons";

interface TabIndex {
  tabName: string;
  children: React.ReactNode;
  quantity: number;
  keyword?: string;
  handleChange?: (e : any) => void;
}

const UserScreen = ({ tabName, quantity, children, keyword, handleChange }: TabIndex) => {
  return (
    <div className="flex flex-col flex-auto overflow-hidden">
      <div className="mt-[16px] mr-[20px] mb-[8px] ml-[30px] bg-[#1E1F22] box-border flex rounded-[4px] overflow-hidden">
        <div className="relative flex flex-row flex-wrap p-[1px] items-center flex-auto w-full">
          <input
            className="text-[16px] leading-[32px] h-[30px] px-[8px] box-border bg-transparent min-w-[48px] m-[1px] appearance-none text-message border-none outline-none flex-grow"
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={handleChange}
          />
          <div className="w-[32px] h-[32px] flex items-center justify-center cursor-text box-border text-label">
            <Search style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-left mt-[16px] mr-[20px] mb-[8px] ml-[38px] text-[#B8B9BF]">
          {tabName} - {quantity}
        </h2>
      </div>
      <div
        id="scroll"
        className="overflow-x-hidden overflow-y-scroll pb-[8px] mt-[8px] box-border min-h-0 max-h-[500px] flex-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default UserScreen;
