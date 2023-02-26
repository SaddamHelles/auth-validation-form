import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../app/store";
import { combineReducers } from "redux";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
interface IFormInput {
  email: string;
  password: string;
}
interface ILoginData {
  user: { email: string; id: string; name: string };
  token: string;
}
export const newLogin = createAsyncThunk(
  "login/newLogin",
  async (initialUser: IFormInput) => {
    try {
      const options = {
        method: "POST",
        url: `${BASE_URL}/login`,
        data: initialUser,
      };

      const response = await axios.request(options).then((res) => res);

      console.log("Email", initialUser.email);
      console.log("Password", initialUser.password);
      // const response = await fetch(`${BASE_URL}/login`, {
      //   method: "POST",
      //   headers: {},
      //   body: new URLSearchParams({
      //     email: initialUser.email,
      //     password: initialUser.password,
      //   }),
      // });
      console.log("outter: ", response);
      if (response.status === 200) {
        const result = { ...response.data };
        console.log("JSON.stringify result: ", result);
        sessionStorage.setItem("login-data", JSON.stringify(result));

        // for fetch type
        // console.log("JSON.stringify: ", JSON.stringify(result));
        // sessionStorage.setItem("login-data", JSON.stringify(result));
        const loginData: ILoginData = JSON.parse(
          sessionStorage.getItem("login-data") || "{}"
        );
        console.log("Login Info email: ", loginData.user.email);
        console.log("Login Info name: ", loginData.user.name);
        console.log("Login Info id: ", loginData.user.id);
        console.log("Login Info token: ", loginData.token);
        console.log("Login all Info: ", loginData);
        // console.log("my token: ", result.token);
        return result;
      }
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState: any = {
  login: [],
  status: "idle", // values: idle | loading | succeeded | failed
  error: null,
};

const signupSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(newLogin.fulfilled, (state, action: PayloadAction<any>) => {
      console.log("action.payload: ", action.payload.token);
      action.payload.user.email = String(action.payload.user.email);
      action.payload.user.password = String(action.payload.user.password);

      state.login.push(action.payload);
    });
  },
});
export const loginReducer = combineReducers({
  login: signupSlice.reducer,
});
// export const selectPosts = (state: RootState) => state.signup;
export const getLoginStatus = (state: RootState) => state.loginReducer.login;
// export const getPostsError = (state: RootState) => state.signup.error;
export default signupSlice;
