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
  name: string;
}
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (initialUser: IFormInput) => {
    try {
      const options = {
        method: "POST",
        url: `${BASE_URL}/signup`,
        data: initialUser,
      };
      const response = await axios.request(options).then((res) => res);
      console.log("token: ", response.data.token);
      console.log("all res data: ", response);

      // if (response.ok) {
      //   const result = await response.json();
      //   console.log("my token: ", result.token);
      //   return result;
      // }
    } catch (err) {
      console.error(err);
    }
    //   try {
    //     const options = {
    //       method: "POST",
    //       url: "https://pro-commerce1.herokuapp.com/api/v1/signup",
    //       data: initialUser,
    //     };
    //     console.log("initialUser before: ", initialUser);
    //     const res = await axios.post(
    //       "https://pro-commerce1.herokuapp.com/api/v1/signup",
    //       initialUser
    //     );
    //     console.log("res after: ", res.data);
    //     return res.data;
    //   } catch (e) {
    //     if (e instanceof TypeError) {
    //       // A TypeError
    //       return e.message;
    //     } else if (e instanceof RangeError) {
    //       // Handle the RangeError
    //       return e.message;
    //     } else if (e instanceof EvalError) {
    //       // you guessed it: EvalError
    //       return e.message;
    //     } else if (typeof e === "string") {
    //       // The error is a string
    //     } else if (axios.isAxiosError(e)) {
    //       // axios does an error check for us!
    //       return e.message;
    //     }
    //   }
  }
);

const initialState: any = {
  signup: [],
  status: "idle", // values: idle | loading | succeeded | failed
  error: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      addNewUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log("action.payload: ", action.payload.token);
        console.log("action value: ", String(action.payload.user.name));
        action.payload.user.email = String(action.payload.user.email);
        action.payload.user.password = String(action.payload.user.password);
        action.payload.user.name = String(action.payload.user.name);

        state.signup.push(action.payload);
      }
    );
  },
});
export const signupReducer = combineReducers({
  signup: signupSlice.reducer,
});
// export const selectPosts = (state: RootState) => state.signup;
export const getSignupStatus = (state: RootState) => state.signupReducer.signup;
// export const getPostsError = (state: RootState) => state.signup.error;
export default signupSlice;
