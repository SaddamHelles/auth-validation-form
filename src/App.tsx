import React from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NavTabs from "./components/NavTabs";
import SignIn from "./pages/SignIn";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Protected from "./components/Protected";
import UserContext from "./context/UserContext";

const App: React.FC = (): JSX.Element => {
  let location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <Navigate to="signin" /> : null}
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
    </>
  );
};

export default App;
