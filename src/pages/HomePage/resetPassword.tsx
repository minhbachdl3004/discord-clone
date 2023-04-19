import Input from "@/components/common/Input";
import React, { useState, useRef, ChangeEvent, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@/components/common/SwitchLink";
import { axiosInstance } from "@/configs/axios";
import useUserStore from "@/store/userStore";

const ResetPassword = () => {
  const resetToken = window.location.hash.split('#')[1];
  const formRef = useRef<HTMLFormElement>(null);
  const [password, setPassword] = useState<string>("");
  const [hiddenPassword, setHiddenPassword] = useState<Boolean>(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const setToken = useUserStore((store) => store.setToken);

  const handleClickShowPassword = useCallback(() => {
    setHiddenPassword(!hiddenPassword);
    setPasswordType(hiddenPassword ? "password" : "text");
  }, [hiddenPassword]);

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    if (!password) {
      setMessage("Password is required");
      return;
    }
    const formData = {
      password: password,
    };
    try {
      setMessage("");
      setLoading(true);
      const response = await axiosInstance.post(
        `/user/reset-password/${resetToken}`,
        formData
      );
      setToken(response?.data.accessToken);
      navigate("/channels/@me");
    } catch (error: any) {
      setMessage("Invalid token");
    }
    setLoading(false);
    formRef.current?.reset(); // Clear the form fields
  };
  return (
    <div className="w-full h-full overflow-hidden container__home-page flex justify-center items-center">
      <div className="flex justify-center w-[480px] h-[349px] bg-secondary rounded-[4px] max:lg:w-[480px] sm:m-[16px] mx-[20px] max-md:w-[480px]">
        <div className="w-full max-h-[408px] py-[24px] shadow-medium bg-secondary mx-[16px] mt-[8px]">
          <img
            src="https://res.cloudinary.com/minhbach3004/image/upload/v1681310404/jjesdc7jch55iftdh7rc.png"
            alt=""
          />
          <h1 className="text-[20px] font-custom text-white my-[24px]">
            Change Your Password
          </h1>
          <form
            className="w-full flex flex-col justify-center px-[12px] box-border"
            ref={formRef}
            onSubmit={handleChangePassword}
          >
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
                name="New Password"
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
            <div className="w-full box-border mt-[10px]">
              <Button
                status={""}
                text="Change Password"
                message={message}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
