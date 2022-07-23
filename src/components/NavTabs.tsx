import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const { authed, handleLogout } = React.useContext(userContext);

  return (
    <Box sx={{ position: "relative", height: "60px", marginTop: "15px" }}>
      <Link to="/signup">
        <span style={{ margin: "10px" }}>SignUp</span>
      </Link>
      {authed ? (
        <Link to="/signin" onClick={handleLogout}>
          SignOut
        </Link>
      ) : (
        <Link to="/signin">SignIn</Link>
      )}
      <Link to="/dashboard">
        <span style={{ margin: "10px" }}>Dashboard</span>
      </Link>
    </Box>
  );
}
