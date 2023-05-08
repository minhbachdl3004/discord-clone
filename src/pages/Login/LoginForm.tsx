import React, { useState, ChangeEvent, useRef, useCallback } from "react";
import Input from "@/components/common/Input";
import useUserStore from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import SwitchLink, { Button } from "@/components/common/SwitchLink";
import { axiosInstance } from "@/configs/axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Popup from "@/components/common/Popup";
import './styles.scss'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hiddenPassword, setHiddenPassword] = useState<Boolean>(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const navigate = useNavigate();

  const setToken = useUserStore((store) => store.setToken);

  const handleClickShowPassword = useCallback(() => {
    setHiddenPassword(!hiddenPassword);
    setPasswordType(hiddenPassword ? "password" : "text");
  }, [hiddenPassword]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };
    try {
      setMessage("");
      setLoading(true);
      const response = await axiosInstance.post("auth/login", newUser);
      setToken(response?.data.accessToken);
      setMessage("Login successful!");
      setStatus("success");
      navigate("/channels/@me");
    } catch (error: any) {
      setMessage(error);
      setStatus("error");
    }
    setLoading(false);
    formRef.current?.reset(); // Clear the form fields
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailValue("This field is required");
      return;
    }
    const formData = {
      email: email,
    }
    try {
      setLoading(true)
      const response = await axiosInstance.post('/user/reset-password', formData)
    } catch (error) {
    }
    setOpenPopup(true)
    setLoading(false)
  };

  return (
    <div className="flex justify-center w-[784px] max-h-[384px] bg-secondary rounded-[4px] max:lg:w-[480px] sm:m-[16px] mx-[20px] max-md:w-[480px]">
      <div className="w-[400px] max-h-[408px] py-[16px] px-[16px] shadow-medium bg-secondary mx-[8px] mt-[8px]">
        <h1 className="text-[20px] font-custom text-white">Welcome back!</h1>
        <form
          className="w-full flex flex-col justify-center px-[12px] box-border"
          ref={formRef}
          onSubmit={handleLogin}
        >
          <Input
            type="email"
            placeHolder="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            isPassword={false}
            value={email}
            name="Email"
            message={message || emailValue}
          />
          <div className="password-input box-border relative mb-[-20px]">
            <Input
              type={passwordType}
              placeHolder="Password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              isPassword={true}
              handleClickShowPassword={handleClickShowPassword}
              hiddenPassword={hiddenPassword}
              value={password}
              name="Password"
              message={message}
            />
            <div
              role="button"
              className="absolute text-label top-[35px] right-0 flex items-center pr-4 cursor-pointer"
              onClick={handleClickShowPassword}
            >
              {hiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <div
            className="text-[#00A8FC] mt-[8px] mb-[8px] block w-auto py-[2px] px-[4px] h-auto relative justify-center items-center box-border bg-none rounded-[3px] border-none font-medium text-[14px] leading-[16px] select-none hover:underline"
            role="button"
            onClick={handleForgotPassword}
          >
            <div className="my-0 mx-auto text-ellipsis overflow-hidden cursor-pointer text-left">
              Forgot your password?
            </div>
          </div>
          <div className="w-full box-border">
            <Button
              status={status}
              text="Login"
              message={message}
              loading={loading}
            />
          </div>
        </form>
        <Popup email={email} handleClose={() => setOpenPopup(false)} open={openPopup} />
        <div className="ml-[6px]">
          <SwitchLink
            text="Need an account?"
            message="Register"
            link="register"
          />
        </div>
      </div>
      <div className="relative overflow-hidden w-[300px] h-[344px] flex items-center justify-center max-md:hidden mr-[10px]">
        <img
          src="https://streamersplaybook.com/wp-content/uploads/2022/10/image.png"
          alt=""
          className="w-full h-[260px] rounded-[4px] object-cover pt-[30px] bg-none"
        />
      </div>
    </div>
  );
};

export default LoginForm;
