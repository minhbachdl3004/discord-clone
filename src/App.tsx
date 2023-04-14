import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage/ChatPage";
import "./App.scss";
import FriendPage from "./pages/HomePage/FriendPage";
import MainLayout from "./components/main/MainLayout";
import useUserStore from "./store/userStore";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import RequireAuth from "@/components/routes/RequireAuth";
import ResetPassword from "./pages/HomePage/resetPassword";

function App() {
  const loadFromToken = useUserStore((store) => store.loadFromToken);

  const loadingFromToken = useUserStore((store) => store.loadingFromToken);

  useEffect(() => {
    loadFromToken();
  }, []);
  console.log(loadFromToken());

  console.log(loadingFromToken);

  if (loadingFromToken) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <CircularProgress size="large" className="scale-[3]" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className="App w-screen h-screen bg-black">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/channels/@me" element={<MainLayout />}>
            <Route
              index
              element={
                <RequireAuth>
                  <FriendPage />
                </RequireAuth>
              }
            />
            <Route
              path=":conversationId"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
