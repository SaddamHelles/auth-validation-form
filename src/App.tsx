import React, { useEffect, useState } from "react";
import "./App.css";
import SignUp, { IUserInfo } from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NavTabs from "./components/NavTabs";
import { Box } from "@mui/material";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import UserContext from "./context/UserContext";

const App: React.FC = (): JSX.Element => {
  const [users, setUsers] = React.useState<IUserInfo[]>([]);
  return (
    <>
      <BrowserRouter>
        <UserContext>
          <NavTabs />
          <Routes>
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route
              path={"/dashboard"}
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
          </Routes>
        </UserContext>
      </BrowserRouter>
    </>
  );
};

export default App;
