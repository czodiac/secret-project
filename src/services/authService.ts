import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { User } from "../types/user";
import { nodeUrl } from '../../constants'
import { handleTryCatchError } from "../utils/handleError";
import { googleUserInfoUrl } from "../../constants"

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
      return response.data;
    })
    .catch((err) => {
      let errMessage = 'Unknown server error.';
      if (err && err.response && err.response.data && err.response.data.message) {
        errMessage = err.response.data.message;
      }
      console.log("loginUser: " + errMessage);
      return Promise.reject(errMessage);
    });
};


const getGoogleProfile = async (accessToken: string) => {
  const bearer_token = `Bearer ${accessToken}`;
  const config = {
    headers: {
      Authorization: bearer_token
    }
  };
  return axios
    .get(googleUserInfoUrl, config)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      handleTryCatchError('getGoogleProfile', 'Google login unsuccessful.', e);
    });
};

const authService = {
  registerUser,
  loginUser,
  getGoogleProfile
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