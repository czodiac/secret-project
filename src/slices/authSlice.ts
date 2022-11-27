import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setLoadingMsg } from "./loadingSlice";
import AuthService from "../services/authService";
import { RootState } from "../app/store";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const registerAsync = createAsyncThunk(
  "auth/register",
  async ({ email, password, state, country, isMale }: { email: string, password: string, state:string, country:string, isMale: boolean }) => {
    const data = await AuthService.registerUser(email, password);
    return { user: data };
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string, password: string }) => {
    const data = await AuthService.loginUser(email, password);
    return { user: data };
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(registerAsync.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.isLoggedIn = true;
      })
  }
});

export const getAuth = (state:RootState) => state.auth;
const { reducer } = authSlice;
export default reducer;
