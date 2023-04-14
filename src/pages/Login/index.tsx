import React from "react";
import LoginForm from "./LoginForm";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const myImageStyle = { width: "500px", height: "600px" };
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/channels/@me");
  }
  return (
    <>
      <Helmet>
        <title>Discord Clone | Login</title>
      </Helmet>
      <div className="w-full h-full overflow-hidden container__home-page">
        <div className="pt-[100px] w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center mr-[5px]">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
