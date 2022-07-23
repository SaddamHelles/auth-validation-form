import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { API_URL } from "../components/apiRequest";
import { IUserInfo } from "./SignUp";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const theme = createTheme();

const SignIn = () => {
  const { handleLogin } = React.useContext(userContext);
  const [users, setUsers] = React.useState<IUserInfo[]>([]);
  const navigate = useNavigate();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleLogin(data.get("email"), data.get("password"));
    const isAvailable = users.find(
      (user) =>
        user.email === data.get("email") &&
        user.password === data.get("password")
    );
    if (isAvailable) {
      console.log("This user is abailable in the json data!");
      navigate("/dashboard");
    } else console.log("This user is not abailable in the json data!");
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw Error("Did not received exected data!");
        const listUsers = await res.json();
        console.log("Login page: ", listUsers);
        // setUsers(listUsers);
      } catch (error) {
        console.log("error not handler");
      }
    })();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                required
                name="email"
                placeholder="Email"
                variant="filled"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                required
                name="password"
                type="password"
                id="password"
                placeholder="password"
                variant="filled"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
