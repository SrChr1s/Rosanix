import { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  verTokenRequest,
} from "../api/auth";
import Cookies from "js-cookie";
import { updateInfoRequest, updatePasswRequest } from "../api/users";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (err) {
      setErrors(err);
      return err;
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (err) {
      setErrors(err);
      return err;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateInfo = async (info) => {
    try {
      const res = await updateInfoRequest(info);
      setUser({ ...user, name: res.data.name, email: res.data.email });
    } catch (err) {
      console.log(err);
    }
  };

  const changePassw = async (passws) => {
    try {
      const res = await updatePasswRequest(passws);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.access_token) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await verTokenRequest(cookies.access_token);
        if (!res.data) {
          setIsAuth(false);
          setUser(null);
          setLoading(false);
          return;
        }
        setIsAuth(true);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        logout,
        updateInfo,
        changePassw,
        isAuth,
        loading,
        errors,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
