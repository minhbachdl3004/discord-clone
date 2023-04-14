import React from 'react'
import FriendScreen from "@/components/main/FriendScreen/index";
import { Helmet } from "react-helmet";

const FriendPage = () => {
  return (
    <>
    <Helmet>
      <title>Discord Clone | Friends</title>
    </Helmet>
    <div className="w-full max-w-full h-full flex flex-row">
      <FriendScreen />
    </div>
    </>
  );
};

export default FriendPage;
