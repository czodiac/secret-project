import axios from "axios";
import { nodeUrl } from '../../constants'
import { logAndAlertError } from "../utils/handleError";
import { googleUserInfoUrl } from "../../constants"
import { AuthMethod } from "../common/enums";

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
      if (response && response.data) {
        Object.assign(response.data, { authMethod: AuthMethod.Native });
        return response.data;
      } else {
        return Promise.reject('Empty response from Node.'); 
      }
    })
    .catch((err) => {
      // This is handled differently from "logAndAlertError". Need to raise Promise.reject for Redux Thunk's reject method to catch it. 
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
      if (response && response.data) {
        Object.assign(response.data, { authMethod: AuthMethod.Google });
        return response.data;
      } else {
        logAndAlertError('getGoogleProfile', 'Google profile API returned an empty response.', '');  
      }
    })
    .catch((e) => {
      logAndAlertError('getGoogleProfile', 'Google login unsuccessful.', e);
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