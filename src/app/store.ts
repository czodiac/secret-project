import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loadingSlice from "../slices/loadingSlice";
import modalSlice from '../slices/modalSlice';
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    loading: loadingSlice,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
