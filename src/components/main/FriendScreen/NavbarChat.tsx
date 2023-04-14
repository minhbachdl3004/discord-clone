import React from "react";
import "../../common/styles.scss";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { BsFillPinAngleFill } from "react-icons/bs";
import CycloneIcon from "@mui/icons-material/Cyclone";
import InboxIcon from "@mui/icons-material/Inbox";
import SearchIcon from "@mui/icons-material/Search";
import CustomTooltip from "@/components/common/Tooltip";
import HamburgerMenu from "@/components/common/HamburgerMenu";
import useUserStore from "@/store/userStore";

interface Props {
  avatar?: string;
  name?: string;
  activeTime?: string;
  onClick?: any;
  isShown?: boolean;
}

export const SectionNavbar = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: string;
}) => {
  return (
    <section
      className={`w-full min-h-[48px] pb-[2px] px-[8px] flex items-center z-[100] border-solid border-x-0 border-t-0 border-b-[1px] border-primary text-[16px] leading-[20px] relative ${styles}`}
    >
      {children}
    </section>
  );
};

interface IconComponent {
  title: string;
  onClick?: any;
  component: React.ReactNode;
}

const IconComponent = ({ title, onClick, component }: IconComponent) => {
  return (
    <CustomTooltip
      title={
        <div className="text-[14px] px-[5px] py-[5px] font-custom">{title}</div>
      }
      placement="bottom"
      arrow
    >
      <div
        className={`relative h-[24px] w-auto flex-0 mx-[8px] text-text`}
        role="button"
        onClick={onClick}
      >
        {component}
      </div>
    </CustomTooltip>
  );
};

const NavbarChat = ({ name, onClick, isShown }: Props) => {
  const setActiveSidebar = useUserStore((store) => store.setActiveSidebar);

  const toggleSidebar = () => {
    setActiveSidebar(true);
  };
  return (
    <SectionNavbar>
      <div className="flex items-center overflow-hidden flex-auto min-w-[598px]">
        <div
          className="space-y-2 lg:hidden cursor-pointer pr-[5px]"
          role="button"
          onClick={toggleSidebar}
        >
          <HamburgerMenu />
        </div>
        <div className="relative h-[24px] w-auto flex-0 mx-[8px] text-text">
          <CycloneIcon style={{ width: "24px", height: "24px" }} />
        </div>
        <div className="max-w-full mr-[8px] flex-0 box-border">
          <h1 className="cursor-pointer flex justify-start overflow-hidden whitespace-nowrap items-center box-border text-white font-custom text-[16px] leading-[20px] font-semibold">
            {name}
          </h1>
        </div>
        <div className="mt-[2px] text-text">
          <TripOriginRoundedIcon />
        </div>
      </div>
      <div className="flex items-center cursor-pointer flex-0 box-border flex-grow justify-end pr-[15px] max-xl:hidden">
        <IconComponent
          title="Pinned Message"
          component={
            <BsFillPinAngleFill
              style={{ width: "24px", height: "24px" }}
              className="hover:text-label duration-200"
            />
          }
        />
        <IconComponent
          title={`${isShown ? "Hide User Profile" : "Show User Profile"}`}
          onClick={onClick}
          component={
            <AccountCircleRoundedIcon
              style={{
                width: "24px",
                height: "24px",
              }}
              className={`hover:text-label duration-1000 ${
                isShown ? "text-white" : ""
              }`}
            />
          }
        />
        <IconComponent
          title="Inbox"
          component={
            <InboxIcon
              style={{ width: "24px", height: "24px" }}
              className="hover:text-label duration-200"
            />
          }
        />
        <div className="flex items-center bg-black text-text w-[200px] mx-[8px] box-border rounded-[4px] px-[10px]">
          <input
            className="w-full bg-black outline-none border-none rounded-[4px] text-[#E0E1E5] placeholder:text-[14px]"
            type="text"
            placeholder="Search"
          />
          <SearchIcon />
        </div>
      </div>
    </SectionNavbar>
  );
};

export interface ListButtons {
  id: number;
  name: string;
}

export default NavbarChat;
