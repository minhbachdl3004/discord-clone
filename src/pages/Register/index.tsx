import React from "react";
import "./styles.scss";
import RegisterForm from "./RegisterForm";
import { Helmet } from "react-helmet";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Discord Clone | Register</title>
      </Helmet>
      <div className="pt-[60px] flex justify-center w-screen h-screen container__home-page">
        {/* <Header /> */}
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
