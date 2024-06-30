import axios, { AxiosResponse } from "axios";

const API_URL = "http://142.93.134.108:1111";

export const api = axios.create({
  baseURL: API_URL,
});

export const signUp = (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return api.post("/sign_up", { email, password });
};

export const login = (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return api.post(
    `/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
      password
    )}`
  );
};

export const getMe = (accessToken: string): Promise<AxiosResponse> => {
  return api.get("/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const refreshAccessToken = (
  refreshToken: string
): Promise<AxiosResponse> => {
  return api.post("/refresh", null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};

type RequestFunction = () => Promise<AxiosResponse>;

export const makeRequest = async (
  requestFn: RequestFunction
): Promise<AxiosResponse> => {
  try {
    return await requestFn();
  } catch (error: any) {
    if (
      error.response &&
      error.response.data.statusCode === 401 &&
      error.response.data.body?.code === 1006
    ) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          window.location.href = "/sign-in";
          throw error;
        }

        const response = await refreshAccessToken(refreshToken);
        const { access_token } = response.data.body;
        localStorage.setItem("accessToken", access_token);

        return await api.request({
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${access_token}`,
          },
        });
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/sign-in";
        throw refreshError;
      }
    }
    throw error;
  }
};
