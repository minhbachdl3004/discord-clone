import React from "react";

interface Props {
  email: string;
  open: boolean;
  handleClose: (e: any) => void;
}

const Popup = ({ email, open = false, handleClose }: Props) => {
  return (
    <>
      {open ? (
        <div className="absolute top-0 left-0 bottom-0 right-0 z-99">
          <div
            className="fixed top-0 left-0 bottom-0 right-0 backdrop opacity-custom opacity-95"
            role="button"
            onClick={handleClose}
          ></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col pb-[40px]">
            <div className="flex flex-col min-h-0 max-w-full bg-bgScreen rounded-[4px]">
              <div className="w-[440px] max-h-[720px] min-h-[200px] box-border">
                <div className="flex-0 flex relative p-[16px] z-1 overflow-x-hidden flex-nowrap justify-start rounded-[4px]">
                  <div className="text-white font-custom text-[20px] leading-[24px] text-left font-semibold">
                    Instructions Sent
                  </div>
                </div>
                <div className="overflow-y-hidden pr-[8px] pb-[20px] relative pl-[16px]">
                  <div className="text-[#D8DEE1] text-[16px] leading-[20px] font-normal text-left">
                    We sent instructions to change your password to {``}
                    <strong>{email}</strong>, please check both your inbox and
                    spam folder
                  </div>
                </div>
                <div className="relative flex-0 flex justify-end items-center p-[16px] z-1 overflow-x-hidden bg-[#2B2D31] mt-[15px] rounded-[4px]">
                  <button
                    className="text-white bg-[#5865F2] h-[38px] min-w-[96px] min-h-[38px] outline-none border-none rounded-[4px] hover:bg-[#5752C4] cursor-pointer duration-200 font-custom"
                    onClick={handleClose}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Popup;
