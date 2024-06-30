import React, { useEffect, useState } from "react";
import { getMe, makeRequest } from "../api/api";
import { useNavigate } from "react-router-dom";

const Account: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const response = await makeRequest(() => getMe(accessToken));
          setUser(response.data);
          if (response.data.body?.code === 1006) {
            navigate("/sign-in");
          }
        } else {
          throw new Error("No access token found");
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/sign-in");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome! Your token for now is valid.</h1>
      <h1>You can wait around 60 seconds and refresh page to try again.</h1>
    </div>
  );
};

export default Account;
