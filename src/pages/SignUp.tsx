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
const theme = createTheme();
interface IFormInput {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp: React.FC = (): JSX.Element => {
  const [signUpInfo, setSignUpInfo] = React.useState<JSX.Element>(<></>);
  const formSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required at least tow letters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(40)
      .min(2),
    lastName: Yup.string()
      .required("Last Name is required at least tow letters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(40)
      .min(2),
    userName: Yup.string()
      .required("User Name is required at least tow letters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(40)
      .min(2),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
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
    setSignUpInfo(
      <div style={{ color: "green", textAlign: "left" }}>
        <h3>All Fields have been passed</h3>
      </div>
    );
    console.log(data);
  };
  const { errors } = formState;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
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
                <p> {errors.firstName?.message} </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  variant="filled"
                  {...register("lastName")}
                />
                <p> {errors.lastName?.message} </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="userName"
                  placeholder="User Name"
                  variant="filled"
                  {...register("userName")}
                />
                <p> {errors.userName?.message} </p>
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
                <p> {errors.email?.message} </p>
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
                <p> {errors.password?.message} </p>
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
                <p> {errors.passwordConfirm?.message} </p>
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
