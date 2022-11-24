import { createSlice } from '@reduxjs/toolkit';

// Handle login/register, etc modal status.
const initialState = {
    value: {
        login: {
            isOpen: false
        },
        register: {
            isOpen: false
        },
        myStore: {
            isOpen: false,
            item: null,
            status: 'idle'
        }
    }
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setMyStoreItemModalStatus: (state, action) => {
            state.value.myStore.isOpen = action.payload;
        },
        openMyStoreItemModal: (state, action) => {
            state.value.myStore.isOpen = true;
            state.value.myStore.item = action.payload;
        },
        setLoginModalStatus: (state, action) => {
            state.value.login.isOpen = action.payload;
        },
        openLoginModal: (state) => {
            state.value.login.isOpen = true;
        },
        setRegisterModalStatus: (state, action) => {
            state.value.register.isOpen = action.payload;
        },
        openRegisterModal: (state) => {
            state.value.register.isOpen = true;
        },
    }
});

export const {
    setMyStoreItemModalStatus,
    openMyStoreItemModal,
    setLoginModalStatus,
    openLoginModal,
    setRegisterModalStatus,
    openRegisterModal
} = modalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getMyStoreItemModalStatus = (state: { modal: { value: { myStore: { isOpen: boolean; }; }; }; }) => state.modal.value.myStore.isOpen;
export const getLoginModalStatus = (state: { modal: { value: { login: { isOpen: boolean; }; }; }; }) => state.modal.value.login.isOpen;
export const getRegisterModalStatus = (state: { modal: { value: { register: { isOpen: boolean; }; }; }; }) => state.modal.value.register.isOpen;
export const getMyStoreItemModalItem = (state: { modal: { value: { myStore: { item: any; }; }; }; }) => state.modal.value.myStore.item;

// Use JS Currying. (Currying is a function that accepts multiple arguments. It will transform this function into a series of functions, where every little function will accept one argument.)
export const setModalWidth = (modalObj: { width: number; }) => (state: { device: { value: any; }; }) => {
    // Set max modal width depending on device type.
    var device = state.device.value;
    if (device === 'Mobile') modalObj.width = 300;
    else if (device === 'Tablet') modalObj.width = 550;
    else modalObj.width = 500;
}
export default modalSlice.reducer;
