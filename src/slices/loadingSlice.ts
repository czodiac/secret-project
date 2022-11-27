import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface LoadingState {
    status : boolean; 
    message:String
}

// Handle login/register, etc modal status.
const initialState: LoadingState = {
    status:false,  
    message:''
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLoadingStatus: (state, action: PayloadAction<boolean>) => {
            state.status = action.payload;
        },
        setLoadingMsg: (state, action: PayloadAction<String>) => {
            state.message = action.payload;
        }
    }
});

export const { setLoadingStatus, setLoadingMsg } = loadingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getLoadingStatus = (state:RootState) => state.loading.status;
export const getLoadingMsg = (state:RootState) => state.loading.message;
export default loadingSlice.reducer;