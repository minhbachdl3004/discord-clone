import React from "react";

const BoucingLoader = () => {
  return (
    <div className="flex w-full max-h-[24px] justify-center items-center box-border">
      <div className="dot animate-pulse"></div>
      <div className="dot animate-pulse animation-delay-200"></div>
      <div className="dot animate-pulse animation-delay-400"></div>
    </div>
  );
};

export default BoucingLoader;
