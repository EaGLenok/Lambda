import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import { refreshAccessToken } from "./api/api";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/sign-in");
        return;
      }

      try {
        const decodedToken = parseJwt(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          await refreshToken();
        }
      } catch (error) {
        console.error("Error checking token expiration:", error);
      }
    };

    const refreshToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        navigate("/sign-in");
        return;
      }

      try {
        const response = await refreshAccessToken(refreshToken);
        const { access_token } = response.data.body;
        localStorage.setItem("accessToken", access_token);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/sign-in");
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/me"
        element={isAuthenticated ? <Account /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/me" : "/sign-in"} />}
      />
    </Routes>
  );
};

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return {};
  }
};

export default App;
