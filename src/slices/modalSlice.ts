import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ModalState {
    value: {
        login: {
            isOpen: boolean;
        };
        register: {
            isOpen: boolean;
        };
    }
}

// Handle login/register, etc modal status.
const initialState: ModalState = {
    value: {
        login: {
            isOpen: false
        },
        register: {
            isOpen: false
        }
    }
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLoginModalStatus: (state, action: PayloadAction<boolean>) => {
            state.value.login.isOpen = action.payload;
        },
        openLoginModal: (state) => {
            state.value.login.isOpen = true;
        },
        setRegisterModalStatus: (state, action: PayloadAction<boolean>) => {
            state.value.register.isOpen = action.payload;
        },
        openRegisterModal: (state) => {
            state.value.register.isOpen = true;
        },
    }
});

export const {
    setLoginModalStatus,
    openLoginModal,
    setRegisterModalStatus,
    openRegisterModal
} = modalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getLoginModalStatus = (state: RootState) => state.modal.value.login.isOpen;
export const getRegisterModalStatus = (state: RootState) => state.modal.value.register.isOpen;

export default modalSlice.reducer;
