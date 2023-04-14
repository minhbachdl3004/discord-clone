import React from "react";

interface Props {
  message: string;
}

const ValidationError = ({ message }: Props) => (
  <span className="text-errorMsg text-[12px] my-[10px] italic normal-case text-left">
    <span className="px-[4px]">-</span>
    {message}
  </span>
);

export default ValidationError;
