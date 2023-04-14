import React, { useEffect, useState } from "react";
import "../../common/styles.scss";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HelpIcon from "@mui/icons-material/Help";
import Tabs from "@/components/common/Tab";
import { TabAddFriend } from "@/components/main/Tabs/AddFriendTab";
import useUserStore from "@/store/userStore";
import PendingList from "@/components/main/Tabs/PendingList";
import { SectionNavbar } from "./NavbarChat";
import OnlineFriendList from "@/components/main/Tabs/OnlineFriendList";
import HamburgerMenu from "@/components/common/HamburgerMenu";

export const listTab = [
  {
    id: 0,
    name: "Online",
    activeTab: "text-[#F3F4F5] bg-[#4E505899]",
    notActiveTab: "text-[#F3F4F5] hover:bg-[#4E50584C] bg-transparent",
    isActive: true,
    component: "",
  },
  {
    id: 1,
    name: "All",
    activeTab: "text-[#F3F4F5] bg-[#4E505899]",
    notActiveTab: "text-[#F3F4F5] hover:bg-[#4E50584C] bg-transparent",
    isActive: false,
    component: "",
  },
  {
    id: 2,
    name: "Pending",
    activeTab: "text-[#F3F4F5] bg-[#4E505899]",
    notActiveTab: "text-[#F3F4F5] hover:bg-[#4E50584C] bg-transparent",
    isActive: false,
    component: "",
  },
  {
    id: 3,
    name: "Blocked",
    activeTab: "text-[#F3F4F5] bg-[#4E505899]",
    notActiveTab: "text-[#F3F4F5] hover:bg-[#4E50584C] bg-transparent",
    isActive: false,
    component: "",
  },
  {
    id: 4,
    name: "Add Friend",
    activeTab: " text-[#2DC770] bg-[#36393F]",
    notActiveTab: "text-[#F3F4F5] bg-[#248045]",
    isActive: false,
    component: "",
  },
];

type TabAPI = {
  name: string;
  apiUrl: string;
  component: any;
};

const tabsAPI: TabAPI[] = [
  {
    name: "Online",
    apiUrl: "conversation/conversations/all?",
    component: <OnlineFriendList />,
  },
  {
    name: "All",
    apiUrl: "conversation/conversations/all?",
    component: <OnlineFriendList />,
  },
  {
    name: "Pending",
    apiUrl: "friend/friend-requests/all?",
    component: <PendingList />,
  },
  {
    name: "Block",
    apiUrl: "conversation/conversations/all?",
    component: <></>,
  },
];

export const MainScreen = () => {
  const [tabs, setTabs] = useState<any[]>(listTab);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const setActiveSidebar = useUserStore((store) => store.setActiveSidebar);
  const user = useUserStore((store) => store.user);

  const handleChangeTab = (index: number) => {
    const newTabs = tabs.map((tab, i) => ({
      ...tab,
      isActive: i === index,
    }));
    setTabs(newTabs);
    setTabIndex(index);
  };

  const toggleSidebar = () => {
    setActiveSidebar(true);
  };

  return (
    <div className="flex-1">
      <SectionNavbar styles="pr-[10px] max-lg:overflow-scroll no-scrollbar">
        <div className="flex items-center overflow-hidden flex-auto min-w-[598px] h-[24px]">
          <div
            className="space-y-2 lg:hidden cursor-pointer pr-[5px]"
            role="button"
            onClick={toggleSidebar}
          >
            <HamburgerMenu />
          </div>
          <div className="relative h-[24px] w-auto flex-0 mx-[8px] box-border text-label cursor-default">
            <PeopleAltIcon style={{ width: "24px", height: "24px" }} />
          </div>
          <div className="mr-[8px] flex-0 w-auto box-border cursor-default">
            <h1 className="flex justify-start overflow-hidden whitespace-nowrap items-center box-border text-label font-custom text-[16px] leading-[20px] font-semibold">
              Friends
            </h1>
          </div>
          <div className="w-[1px] h-[24px] mx-[8px] flex-0 bg-[#4E50587A]"></div>
          <div className="flex flex-row box-border flex-grow">
            <Tabs tabs={tabs} handleChange={handleChangeTab} />
          </div>
          <div className="flex flex-row box-border flex-grow justify-end text-label cursor-pointer gap-[15px] mr-[30px] max-lg:hidden">
            <InboxIcon style={{ width: "24px", height: "24px" }} />
            <HelpIcon style={{ width: "24px", height: "24px" }} />
          </div>
        </div>
      </SectionNavbar>
      <div className="flex flex-row h-full relative overflow-hidden">
        {tabIndex === 4 ? (
          <TabAddFriend userId={user?.id} />
        ) : (
          tabsAPI[tabIndex].component
        )}
        {/* <ActiveScreen /> */}
      </div>
    </div>
  );
};
