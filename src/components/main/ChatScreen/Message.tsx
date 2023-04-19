import React, { useState, useEffect } from "react";
import ChatOptional from "@/components/common/ChatOptional";
import format from "date-fns/format";
import "react-image-lightbox/style.css";
import { Modal } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  message: string;
  messageInfo: any;
  isContinue?: boolean;
  isShown?: boolean;
  isDivider?: boolean;
  images: String[];
}

const modalStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid #36393F",
};

const MessageHeader = ({
  message,
  messageInfo,
  isContinue,
  isShown,
  isDivider,
  images,
}: Props) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const dateTime = new Date(messageInfo?.createdAt);
    const isToday =
      new Date(messageInfo?.createdAt).getDate() === new Date().getDate();
    const formatDate = isToday
      ? "Today at " + format(dateTime, "HH:mm").toString()
      : format(dateTime, "dd/MM/yyyy HH:mm").toString();
    setFormattedDate(formatDate);
    setTime(format(dateTime, "HH:mm").toString());
  }, [messageInfo?.createdAt]);

  const handleNextImage = () => {
    if (imgIndex === images.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex((prevState) => prevState + 1);
    }
  };

  const handlePrevImage = () => {
    if (imgIndex === 0) {
      setImgIndex(images.length - 1);
    } else {
      setImgIndex((prevState) => prevState - 1);
    }
  };

  return (
    <>
      <div
        className={`${
          isContinue ? "min-h-[22px]" : "min-h-[48px]"
        } pl-[72px] pr-[48px]`}
      >
        <div className="min-h-[22px] pt-[3px] pb-[2px] static indent-0">
          {isContinue ? (
            <span
              className="absolute left-0 top-5 h-[22px] leading-[1.375rem] w-[56px] select-none text-right z-1 text-label"
              role="button"
            >
              {isShown ? (
                <span className="text-[12px] leading-[1.375rem] text-label align-baseline ml-[0.25rem] inline-block h-[1.25rem] cursor-default pointer-events-none font-medium">
                  {time}
                </span>
              ) : null}
            </span>
          ) : (
            <>
              <img
                className="pointer-events-auto indent-[-9999px] absolute left-[16px] w-[40px] h-[40px] top-[5px] rounded-full overflow-hidden cursor-pointer z-1"
                src={`${messageInfo?.senderId.avatar}`}
                alt=""
              />
              <div className="block relative leading-[20px] min-h-[1.375rem] text-left ">
                <span className="mr-[0.25rem] leading-[1.375rem] text-[16px] text-white">
                  {messageInfo?.senderId.username}
                </span>
                <span className="text-[12px] leading-[1.375rem] text-label align-baseline ml-[0.25rem] inline-block h-[1.25rem] cursor-default pointer-events-none font-medium">
                  {formattedDate}
                </span>
              </div>
            </>
          )}

          <div
            className={`pr-[12px] overflow-hidden z-10 relative text-white`}
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            <div
              className={`text-message pr-1 pt-[2px] pl-1 text-2xl text-left whitespace-pre-wrap font-custom`}
            >
              {message}
            </div>
            {images.length > 0 ? (
              <div className="grid grid-flow-row gap-y-[0.25rem] grid-cols-custom indent-0 min-h-0 min-w-0 py-[0.125rem] relative">
                <div className="grid grid-cols-2 gap-[4px] max-w-[550px]">
                  {images.map((image, i) => (
                    <div key={i} className="w-full h-full">
                      <img
                        className="min-w-[182px] min-h-[173px] max-h-[280px] w-full h-full rounded-[8px] cursor-pointer"
                        src={`${image}`}
                        alt=""
                        onClick={() => {
                          setOpen(true);
                          setImgIndex(i);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={modalStyles}
            >
              <>
                <button
                  className="absolute left-[10px] bg-transparent outline-none border-none text-text cursor-pointer hover:text-label"
                  onClick={handlePrevImage}
                >
                  <ArrowBackIosNewIcon
                    style={{ width: "26px", height: "26px" }}
                  />
                </button>
                <div>
                  <img
                    className="w-[100%] max-h-[450px]"
                    src={`${images[imgIndex]}`}
                    alt=""
                  />
                </div>
                <button
                  className="absolute right-[10px] bg-transparent outline-none border-none text-text cursor-pointer hover:text-label"
                  onClick={handleNextImage}
                >
                  <ArrowForwardIosIcon
                    style={{ width: "26px", height: "26px" }}
                  />
                </button>
              </>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

const Message = ({
  message,
  messageInfo,
  isContinue,
  isDivider,
  images,
}: Props) => {
  const [isShown, setIsShown] = useState(false);
  const date = new Date(messageInfo?.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const flexDirection = "flex-row";

  return (
    <>
      {isDivider ? (
        <div className="mt-[1.5rem] mb-[0.5rem] relative left-auto right-auto z-1 h-0 flex items-center justify-center pointer-events-none box-border bg-label border-0 border-t-[1px] border-solid border-[#464a4d]">
          <span className="block flex-0 py-[2px] px-[6px] text-label bg-bgScreen leading-[13px] text-[12px] mt-[-1px] font-semibold rounded-[8px]">
            {formattedDate}
          </span>
        </div>
      ) : null}

      <div
        className={`relative flex ${flexDirection} flex-grow w-full hover:bg-[#30343a] ${
          isContinue ? "" : "mt-[15px]"
        } py-[2px] pb-1`}
        onMouseOver={() => setIsShown(true)}
        onMouseOut={() => setIsShown(false)}
      >
        <MessageHeader
          messageInfo={messageInfo}
          message={message}
          isContinue={isContinue}
          isShown={isShown}
          isDivider={isDivider}
          images={images}
        />
        <div className="absolute top-[-15px] right-[10px] min-w-0 w-[96px] min-h-[30px] self-stretch flex-col bg-transparent flex flex-grow max-w-full justify-end box-border">
          <div className=" flex flex-col justify-center flex-shrink-0 w-full z-10 flex-grow rounded-[4px] box-border">
            {isShown && <ChatOptional />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
