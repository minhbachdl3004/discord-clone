import React, { useEffect, useState } from "react";
import "./styles.scss";
import ValidationError from "./ValidationInput";
import useUserStore from "@/store/userStore";

interface Rule {
  pattern?: RegExp;
  message: string;
  min?: number;
}

export const usernameFormRules: Rule[] = [
  {
    pattern: /^\D.*$/,
    message: "Username cannot start with a number",
  },
  {
    min: 5,
    message: "Username must be at least 5 characters long",
  },
];

export const passwordFormRules: Rule[] = [
  {
    pattern: /^(?=.*[a-zA-Z0-9]).{6,}$/,
    message: "Password is too weak or common to use",
  },
  { min: 6, message: "Must be at least 6 characters long" },
];

interface Props {
  type: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: Boolean;
  handleClickShowPassword?: any;
  hiddenPassword?: Boolean;
  value?: any;
  name?: string;
  width?: string;
  marginLeft?: string;
  error?: any;
  label?: string;
  defaultValue?: string;
  message?: string;
}

const Input = ({
  type,
  placeHolder,
  onChange,
  value,
  name,
  width = "w-full",
  marginLeft = "",
  error,
  label = "",
  message,
}: Props) => {
  const [validate, setValidate] = useState<string | null>(null);
  const setErrorInput = useUserStore((store) => store.setErorInput);

  useEffect(() => {
    setErrorInput(validate);
  }, [validate]);

  const classes = `w-full h-full py-[12px] pr-[25px] pl-[10px] rounded-[2px] bg-black border-none text-[15px] focus:rounded-[2px] outline-none text-gray-300 box-border focus:outline-blue-500 placeholder-[#B9BBBE]`;

  const labelClasses = `block mb-[8px] font-custom text-[12px] font-custom leading[16px] font-bold uppercase space tracking-[0.02em] outline-none text-left ${marginLeft}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    const value = event.target.value;

    if (name === "username") {
      for (const rule of usernameFormRules) {
        if (rule.pattern && !rule.pattern.test(value)) {
          setValidate(rule.message);
          return;
        }
        if (rule.min && value.length < rule.min) {
          setValidate(rule.message);
          return;
        }
      }
    } else if (name === "password") {
      for (const rule of passwordFormRules) {
        if (rule.pattern && !rule.pattern.test(value)) {
          setValidate(rule.message);
          return;
        }
        if (rule.min && value.length < rule.min) {
          setValidate(rule.message);
          return;
        }
      }
    }
    setValidate("");
  };

  return (
    <div className="mb-[20px] box-border">
      {validate ? (
        <>
          <label className={`${labelClasses} text-[#FA777C]`}>
            {label ? label : name}
            <ValidationError message={validate} />
          </label>
        </>
      ) : error ? (
        <>
          <label className={`${labelClasses} text-[#FA777C]`}>
            {error?.name}
            <ValidationError message={error?.msg} />
          </label>
        </>
      ) : message ? (
        <>
          <label className={`${labelClasses} text-[#FA777C]`}>
            {name}
            <ValidationError message={message} />
          </label>
        </>
      ) : (
        <>
          <label className={`${labelClasses} text-label`}>
            {label ? label : name}
            <span className="text-[#F23F42] text-[12px]">*</span>
          </label>
        </>
      )}
      <div className="">
        <input
          type={type}
          name={name}
          className={classes}
          placeholder={placeHolder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Input;
