import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counter";
import modalSlice from '../slices/modalSlice';
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    modal: modalSlice,
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
