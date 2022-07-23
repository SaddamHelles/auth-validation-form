import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiRequest from "../components/apiRequest";
import { API_URL } from "../components/apiRequest";
const theme = createTheme();
interface IFormInput {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface IUserInfo {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = (): JSX.Element => {
  const [signUpInfo, setSignUpInfo] = useState<JSX.Element>(<></>);
  const [users, setUsers] = useState<IUserInfo[]>([]);

  const formSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
      .max(40, "At most Forty letters")
      .min(2, "At least tow letters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
      .max(40, "At most Forty letters")
      .min(2, "At least tow letters"),
    userName: Yup.string()
      .required("User Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
      .max(40, "At most Forty letters")
      .min(2, "At least tow letters"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(100)
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters"),
    passwordConfirm: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must and should match"),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } =
    useForm<IFormInput>(validationOpt);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleAddItem(data);
    setSignUpInfo(
      <Box sx={{ color: "#1976d2", textAlign: "left" }}>
        <Typography component="h3" variant="h5">
          All Fields have been passed
        </Typography>
      </Box>
    );
    return console.log(data);
  };
  const { errors } = formState;

  const handleAddItem = async (data: any) => {
    console.log("first: ", data);
    const newId = Math.floor(Math.random() * 10000);
    const myNewUser = {
      id: newId,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      password: data.password,
    };
    const usrew = [...users, myNewUser];
    setUsers(usrew);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewUser),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) console.log(result);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {formState.isValid && signUpInfo}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  placeholder="First Name"
                  variant="filled"
                  autoFocus
                  {...register("firstName")}
                />
                <Typography> {errors.firstName?.message} </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  variant="filled"
                  {...register("lastName")}
                />
                <Typography> {errors.lastName?.message} </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="userName"
                  placeholder="User Name"
                  variant="filled"
                  {...register("userName")}
                />
                <Typography> {errors.userName?.message} </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  placeholder="Email"
                  variant="filled"
                  {...register("email")}
                  autoComplete="email"
                />
                <Typography> {errors.email?.message} </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="Password"
                  variant="filled"
                  type="password"
                  id="password"
                  {...register("password")}
                />
                <Typography> {errors.password?.message} </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Confirm Password"
                  variant="filled"
                  id="passwordConfirm"
                  type="password"
                  {...register("passwordConfirm")}
                />
                <Typography> {errors.passwordConfirm?.message} </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
