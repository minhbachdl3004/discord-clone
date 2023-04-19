import React, { useEffect, useRef } from "react";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data/sets/14/facebook.json";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import CustomTooltip from "@/components/common/Tooltip";

interface Props {
  message: string;
  handleInput: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleDrop: (e: any) => void;
  handleDrag: (e: any) => void;
  handleUploadFile: (e: any) => void;
  handleClick: (e: any) => void;
  fileInputRef: any;
  handleShowEmojiPicker: any;
  showEmojiPicker: boolean;
  handleInputEmoji: any;
  handlePaste: any;
  handleRemove: any;
  images: any[];
  file: any;
}

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

const ChatInput = ({
  message,
  handleInput,
  handleKeyDown,
  handleShowEmojiPicker,
  showEmojiPicker,
  handleInputEmoji,
  handlePaste,
  handleRemove,
  images,
  file,
  handleDrop,
  handleDrag,
  handleUploadFile,
  handleClick,
  fileInputRef,
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, message);

  return (
    <div className="relative flex items-end text-[16px] py-[1.25rem] px-[1.5rem] gap-[0.75rem] overflow-hidden">
      <div className="min-w-0 max-w-full w-full box-border flex relative outline-none bg-[#40444B] rounded-[8px] py-[3px] flex-col">
        <div
          className="w-full h-full flex flex-col outline-none border-none"
          // contentEditable
          onDrop={handleDrop}
          onDragOver={handleDrag}
        >
          {images.length > 0 && (
            <>
              <ul className="flex gap-[24px] mb-[2px] px-[10px] pb-[10px] list-none overflow-x-auto">
                {images.map((image, i) => (
                  <li
                    key={i}
                    className="flex-col inline-flex justify-center items-center bg-[#2b2d31] rounded-[4px] p-[8px] min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px] list-none relative"
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex justify-center h-full box-border mt-auto min-h-0">
                        <img
                          src={image.src}
                          className="indent-[-9999px] rounded-[3px] max-w-full object-contain"
                          alt="Pasted"
                        />
                      </div>
                      <div className="absolute top-0 right-0">
                        <div className="absolute right-0 z-1 shadow-custom">
                          <div className="bg-primary grid grid-flow-col box-border h-[32px] rounded-[4px] items-center justify-start select-none relative overflow-hidden">
                            <div
                              className="w-[32px] h-[32px] text-label flex justify-center items-center"
                              role="button"
                            >
                              <RemoveRedEyeIcon
                                style={{ width: "20px", height: "20px" }}
                              />
                            </div>
                            <div
                              className="w-[32px] h-[32px] text-label flex justify-center items-center"
                              role="button"
                            >
                              <ModeEditOutlineIcon
                                style={{ width: "20px", height: "20px" }}
                              />
                            </div>
                            <div
                              className="w-[32px] h-[32px] text-red-600 flex justify-center items-center cursor-pointer"
                              role="button"
                              onClick={() => handleRemove(image.id)}
                            >
                              <DeleteIcon
                                style={{ width: "20px", height: "20px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="w-full h-[1px] bg-[#323638]"></div>
            </>
          )}
          <div className="w-full h-full flex">
            <div
              className="w-[32px] h-[32px] rounded-full pt-[2px] ml-[10px] flex items-center justify-center text-text z-20 top-10 cursor-pointer hover:text-label"
              onClick={handleClick}
            >
              <CustomTooltip
                title={
                  <div className="text-[14px] px-[5px] py-[5px] font-custom">
                    Attach a file
                  </div>
                }
                placement="top"
                arrow
              >
                <ImageIcon style={{ width: "24px", height: "24px" }} />
              </CustomTooltip>
            </div>
            <input
              type="file"
              onChange={handleUploadFile}
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
            />

            <textarea
              className="bg-transparent ml-[1rem] basis-auto text-[16px] text-left flex-grow outline-none border-none text-message overflow-hidden font-custom pt-[10px] resize-none"
              placeholder="Aa"
              onChange={handleInput}
              ref={textAreaRef}
              rows={1}
              onKeyDown={handleKeyDown}
              value={message}
              onPaste={handlePaste}
            />
            <span className="text-white">
              <div
                role="button"
                className="flex w-[36px] h-[36px] justify-center items-center cursor-pointer text-gray-400 border-none
            hover:text-bg-message"
                onClick={handleShowEmojiPicker}
              >
                <SentimentSatisfiedRoundedIcon
                  style={{ width: "22px", height: "22px" }}
                />
              </div>
              {showEmojiPicker && (
                <div className="fixed right-[15px] bottom-24 z-99">
                  <Picker
                    data={data}
                    emojiSize={20}
                    emojiButtonSize={28}
                    onEmojiSelect={handleInputEmoji}
                    set="facebook"
                    theme="auto"
                    icons="auto"
                    maxFrequentRows={0}
                    skinTonePosition="preview"
                  />
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
