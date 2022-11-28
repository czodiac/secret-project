import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import AuthService from "../services/authService";
import { RootState } from "../app/store";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

export interface AuthState {
  isLoading : boolean; 
  isLoggedIn : boolean;
  errMessage: string;
  user: any;
  userUpdated: boolean; // When local storage has user data and page refreshes, AuthState.user gets deleted. This is set to true when Redux store's user data is updated with local storage's user data. Or, setAuthUser is called 9 times.
}

const initialState: AuthState = {
  isLoading: false,  
  isLoggedIn: false,
  errMessage: '',
  user: undefined,
  userUpdated: false
}

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthErrMessage: (state, action:PayloadAction<string>) => {
      state.errMessage = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthUserUpdated: (state, action) => {
      state.userUpdated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.errMessage = '';
      })
      .addCase(loginAsync.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.errMessage = '';
        state.isLoggedIn = true;
        if (payload && payload.user) {
          state.user = payload.user;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        // Axios server error ex. 401 Unauthorized
        state.isLoading = false;
        if (action.error && action.error.message) {
          state.errMessage = action.error.message;
        } else {
          state.errMessage = 'Unknown error';
        }
        state.isLoggedIn = false;
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

export const { setAuthErrMessage, setAuthUser, setAuthUserUpdated } = authSlice.actions;
export const getAuth = (state:RootState) => state.auth;
export const getAuthIsLoading = (state:RootState) => state.auth.isLoading;
export const getAuthIsLoggedIn = (state:RootState) => state.auth.isLoggedIn;
export const getAuthErrMessage = (state:RootState) => state.auth.errMessage;
export const getAuthUser = (state:RootState) => state.auth.user;
export const getAuthUserUpdated = (state:RootState) => state.auth.userUpdated;

export default authSlice.reducer;