import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import CircleIcon from "@mui/icons-material/Circle";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import useUserStore from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import CustomTooltip from "./Tooltip";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ViewProfile from "./ViewProfile";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const boxStyle = {
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: 340,
  height: 372,
  bgcolor: "#292B2F",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  boxSizing: "border-box",
  marginTop: "180px",
  marginLeft: "15px",
  outline: "none",
  padding: 0,
};

const modalStyles = {
  display: "flex",
  alignItems: "center",
  border: "2px solid #36393F",
};

const boxStyleForEditProfile = {
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: {
    xs: 450,
    sm: 500,
    md: 600,
    lg: 600,
    xl: 600,
  },
  height: 450,
  bgcolor: "#292B2F",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  boxSizing: "border-box",
  outline: "none",
  padding: 0,
};

const modalStylesForEditProfile = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #36393F",
};

const UnderlineComponent = () => {
  return (
    <div className="h-[1px] bg-underline mt-[12px] mx-[12px] sticky top-0"></div>
  );
};

interface FlexPos {
  flexPos: string;
  smSize: string;
  mdSize: string;
  marginBottom?: string;
  headerText: string;
  pText: string;
  textAlign?: string;
}

export const ChildComponent = ({
  flexPos,
  smSize,
  mdSize,
  marginBottom,
  headerText,
  pText,
  textAlign,
}: FlexPos) => {
  const classes = ` leading-[18px] overflow-hidden text-ellipsis box-border`;
  return (
    <>
      <div
        className={`flex ${flexPos} ${textAlign} flex-1 box-border overflow-hidden text-ellipsis mt-[2px]`}
      >
        <div
          className={`max-w-[180px] text-white ${classes} text-[${mdSize}] whitespace-nowrap text-ellipsis overflow-hidden mb-[${marginBottom}]`}
        >
          {headerText}
        </div>
        <div className={`text-label ${classes} text-[${mdSize}]`}>{pText}</div>
      </div>
    </>
  );
};

interface UsernameProps {
  username: string;
  usernameCode: string;
}

export const UsernameComponent = ({
  username,
  usernameCode,
}: UsernameProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const user = useUserStore((store) => store.user);

  return (
    <>
      <CustomTooltip
        title={
          <div className="text-[14px] px-[5px] py-[5px] font-custom">
            {copied ? "Copied" : "Click to copy username"}
          </div>
        }
        placement="top"
        arrow
        copied={copied}
      >
        <div
          className="flex flex-col px-[12px] pt-[12px] cursor-pointer"
          role="button"
          onMouseOver={() => setIsShown(true)}
          onMouseOut={() => setIsShown(false)}
          onClick={() => {
            navigator.clipboard.writeText(`${username}#${usernameCode}`);
            setCopied(true);
          }}
        >
          <div className="flex justify-between pr-[8px] min-h-[24px]">
            <ChildComponent
              flexPos="flex-row"
              smSize={""}
              mdSize={"20px"}
              headerText={username}
              pText={`#${usernameCode}`}
            />
            <div className="w-[22px] h-[22px] text-white" role="button">
              {isShown && (
                <FileCopyOutlinedIcon
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          </div>
        </div>
      </CustomTooltip>

      <UnderlineComponent />
    </>
  );
};

export const RegisterDayComponent = () => {
  return (
    <>
      <div className="flex flex-col px-[12px] pt-[12px] cursor-context-menu">
        <div className="flex justify-start pr-[8px] min-h-[24px]">
          <ChildComponent
            flexPos="flex-col"
            smSize={""}
            mdSize={"12px"}
            headerText="DISCORD MEMBER SINCE"
            pText="Jan 05, 2023"
            marginBottom="6px"
          />
        </div>
      </div>
      <UnderlineComponent />
    </>
  );
};

interface customComponentProps {
  status: string;
  isShown?: boolean;
  icon: any;
  color: string;
}

const CustomComponent = ({
  icon,
  status,
  isShown = true,
  color,
}: customComponentProps) => {
  return (
    <div className="w-full pt-[6px] px-[8px] box-border">
      <div className="w-full flex box-border py-[6px] px-[8px] hover:bg-secondary rounded-[4px] cursor-pointer">
        <div className={`w-[18px] h-[18px] ${color} mr-[5px]`}>{icon}</div>
        <div className="flex-auto whitespace-nowrap overflow-hidden text-ellipsis text-label text-[14px]">
          {status}
        </div>
        {isShown && (
          <div className="text-label">
            <NavigateNextIcon />
          </div>
        )}
      </div>
    </div>
  );
};

const iconsObject = {
  online: <CircleIcon />,
  idle: <Brightness3Icon />,
  doNotDisturb: <DoNotDisturbOnIcon />,
  offline: <CircleIcon />,
};

const ActiveStatusComponent = () => {
  return (
    <>
      <CustomComponent
        icon={<DoNotDisturbOnIcon style={{ width: "18px", height: "18px" }} />}
        status="Do Not Disturb"
        color="text-[#c0392b]"
      />
      <CustomComponent
        icon={
          <SentimentVerySatisfiedIcon
            style={{ width: "18px", height: "18px" }}
          />
        }
        status="Set Custom Status"
        color="text-[#B9BBBE]"
        isShown={false}
      />
      <UnderlineComponent />
    </>
  );
};

const LogoutComponent = () => {
  const logout = useUserStore((store) => store.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="" role="button" onClick={handleLogout}>
      <CustomComponent
        icon={<LogoutOutlinedIcon style={{ width: "18px", height: "18px" }} />}
        status="Logout"
        color="text-[#B9BBBE]"
      />
      <UnderlineComponent />
    </div>
  );
};

const ProfileCard = ({ open, handleClose }: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [openCropImage, setOpenCropImage] = useState<boolean>(false);
  const user = useUserStore((store) => store.user);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStyles}
      >
        <Box sx={boxStyle}>
          <div
            className="w-full h-[60px] bg-[#E5D2CD] rounded-t-[8px]"
            role="button"
            onClick={() => {
              setOpenCropImage(true);
              handleClose();
              setIsShown(false);
            }}
          >
            <CustomTooltip
              title={
                <div className="text-[14px] px-[5px] py-[5px] font-custom">
                  Edit Profile
                </div>
              }
              placement="top"
              arrow
            >
              <div
                className="absolute w-[24px] h-[24px] top-[12px] right-[12px] rounded-full bg-[#0000004C] flex justify-center items-center px-[2px] py-[2px] cursor-pointer"
                role="button"
              >
                <ModeEditOutlineIcon
                  style={{ width: "18px", height: "18px", color: "#fff" }}
                />
              </div>
            </CustomTooltip>
          </div>
          <div
            className="absolute w-[90px] h-[90px] left-[20px] top-[10px] box-border border-[5px] border-solid rounded-full border-secondary cursor-pointer"
            role="button"
            onMouseOver={() => setIsShown(true)}
            onMouseOut={() => setIsShown(false)}
            onClick={() => {
              setOpenCropImage(true);
              handleClose();
              setIsShown(false);
            }}
          >
            <img
              className="w-full h-full object-cover rounded-full"
              src={`${user?.avatar}`}
              alt=""
            />
            {isShown ? (
              <div className="absolute flex justify-center items-center left-[0px] top-[0px] w-[80px] h-[80px] rounded-full bg-customColor cursor-pointer text-white uppercase font-custom text-[7px]">
                <h3 className="text-[10px]">View Profile</h3>
              </div>
            ) : null}
          </div>
          <div className="flex flex-grow w-full pt-[50px] px-[16px] pb-[16px] box-border">
            <div className="w-full h-full bg-[#18191C] rounded-[8px]">
              <UsernameComponent
                username={user?.username}
                usernameCode={user?.usernameCode}
              />
              <RegisterDayComponent />
              <ActiveStatusComponent />
              <LogoutComponent />
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openCropImage}
        onClose={() => setOpenCropImage(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStylesForEditProfile}
      >
        <Box sx={boxStyleForEditProfile}>
          <ViewProfile />
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCard;
