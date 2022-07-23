import React, { createContext, PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../components/apiRequest";
import { IUserInfo } from "../pages/SignUp";

interface IContextType {
  authed: boolean;
  handleLogin: (
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ) => void;
  handleLogout: () => void;
}
const UserContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = React.useState<IUserInfo[]>([]);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ) => {
    console.log("object");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw Error("Did not received exected data!");
      const listUsers = await res.json();
      setUsers(listUsers);

      const isAvailable = users.find(
        (user) => user.email === email && user.password === password
      );
      if (isAvailable) {
        setAuthed(true);
        navigate("/dashboard");
        setUsers(listUsers);
      } else {
        setAuthed(false);
      }
    } catch (error) {
      console.log("error not handler");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    navigate("/signin");
  };
  return (
    <userContext.Provider value={{ authed, handleLogin, handleLogout }}>
      {children}
    </userContext.Provider>
  );
};

export const userContext = createContext<IContextType>({} as any);
export default UserContext;
