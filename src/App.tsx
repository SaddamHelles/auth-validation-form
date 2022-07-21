import React, { FormEventHandler } from "react";
import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./pages/SignUp";

const App: React.FC = (): JSX.Element => {
  return <SignUp />;
};

export default App;
