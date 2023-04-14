import React from "react";
import Search from "@/components/main/Search/index";
import ChatList from "@/components/main/ChatList";
import Profile from "@/components/common/Profile";
import useUserStore from "@/store/userStore";
import CloseIcon from "@mui/icons-material/Close";

export const imgUrl = import.meta.env.VITE_IMG_URL;

const Sidebar = () => {
  const user = useUserStore((store) => store.user);
  const activeSidebar = useUserStore((store) => store.activeSidebar);
  const setActiveSidebar = useUserStore((store) => store.setActiveSidebar);

  const handleClose = () => {
    setActiveSidebar(false);
  };

  return (
    <>
      {activeSidebar ? (
        <div className="relative z-50">
          <div
            className="fixed inset-0 bg-gray-800 opacity-25"
            role="button"
            onClick={handleClose}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 max-w-[360px] w-[240px] h-full flex flex-row box-border flex-shrink-0  z-0 overflow-hidden bg-primary">
            <div className="relative w-full flex flex-col">
              <Search />
              <ChatList userId={user.id} />
              <Profile
                username={user.username}
                usernameCode={user.usernameCode}
                avatar={`${user.avatar}`}
              />
            </div>
          </nav>
        </div>
      ) : (
        <nav className="relative max-w-[360px] w-[240px] h-full flex flex-row box-border flex-shrink-0  z-0 overflow-hidden bg-primary max-lg:hidden">
          <div className="relative w-full flex flex-col">
            <Search />
            <ChatList userId={user.id} />
            <Profile
              username={user.username}
              usernameCode={user.usernameCode}
              avatar={`${user.avatar}`}
            />
          </div>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
