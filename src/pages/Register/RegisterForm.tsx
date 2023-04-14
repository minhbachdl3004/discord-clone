import React, { useState, useRef, ChangeEvent, useCallback } from "react";
import Input from "@/components/common/Input";
import useUserStore from "@/store/userStore";
import SwitchLink, { Button } from "@/components/common/SwitchLink";
import { axiosInstance } from "@/configs/axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

function generateRandom4Digits() {
  return Math.floor(Math.random() * 9000) + 1000;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState<Boolean>(false);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const setToken = useUserStore((store) => store.setToken);

  const errorInput = useUserStore((store) => store.errorInput);

  const handleClickShowPassword = useCallback(() => {
    setHiddenPassword(!hiddenPassword);
    setPasswordType(hiddenPassword ? "password" : "text");
  }, [hiddenPassword]);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const newUser = {
      email: email,
      username: username,
      usernameCode: generateRandom4Digits(),
      password: password,
    };

    if (errorInput === "") {
      try {
        setLoading(true);
        const userRegister = await axiosInstance.post("auth/register", newUser);
        setMessage("Register account successful!");
        setStatus("success");
        setToken(userRegister?.data.accessToken);
        navigate("/channels/@me");
      } catch (error: any) {
        setMessage(error.response?.data.error);
        setStatus("error");
      }
    } else {
      setMessage("Input is not valid");
      setStatus("error");
    }
    formRef.current?.reset();
    setLoading(false);
  };
  return (
    <div className="w-[400px] max-h-[450px] py-[20px] px-[20px] rounded-[4px] shadow-medium bg-secondary">
      <div>
        <h1 className="text-white text-[20px] font-custom">
          Create an account
        </h1>
        <form
          className="w-full flex flex-col justify-center px-[6px] box-border"
          ref={formRef}
          onSubmit={handleRegister}
        >
          <Input
            type="email"
            placeHolder="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            isPassword={false}
            value={email}
            name="email"
          />
          <Input
            type="text"
            placeHolder="Username"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            isPassword={false}
            value={username}
            name="username"
          />
          <div className="relative">
            <Input
              type={passwordType}
              placeHolder="Password"
              isPassword={true}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              hiddenPassword={hiddenPassword}
              value={password}
              name="password"
            />
            <div
              role="button"
              className="absolute text-label top-[35px] right-0 flex items-center pr-4 cursor-pointer"
              onClick={handleClickShowPassword}
            >
              {hiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <div className="w-full box-border">
            <Button
              status={status}
              text="Register"
              message={message}
              loading={loading}
            />
          </div>
        </form>
        <SwitchLink
          text="Already have an Account?"
          message="Login"
          link="login"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
