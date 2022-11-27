import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { endpoints } from "../../constants";
import { User } from "../types/user";
import { setLoadingMsg } from "../slices/loadingSlice"
import { nodeUrl } from '../../constants'

type DataRes = { data: User };

const registerUser = (email: string, password: string) => {
  return axios.post(nodeUrl + "/auth/signup", {
    email,
    password,
  });
};

const loginUser = (email: string, password: string) => {
  return axios
    .post(nodeUrl + "/auth/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        //localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      console.log("loginUser: " + error);
      return Promise.reject(error);
    });
};

const logout = () => {
  //localStorage.removeItem("user");
};

const googleLoginOrRegister = async (accessToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.google, {
      accessToken,
    });
    return data;
  } catch (error) {
    //useAppDispatch()(setLoadingMsg(error));
  }
};

const authService = {
  registerUser,
  loginUser,
  logout,
  googleLoginOrRegister
};

export default authService;
/*
export const forgotPassword = async (email: string) => {
  try {
    const { data } = await axios.post<{ emailSent: boolean }>(
      endpoints.forgotPassword,
      { email }
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const { data } = await axios.post(
      endpoints.resetPassword,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    if (error.response.status === 401) return alert("Invalid or Expired Token");
    alert("Unable to reset password.");
  }
};
*/