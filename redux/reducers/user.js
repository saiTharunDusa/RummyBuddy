import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false
}

const user = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        logIn : (state, action) => {
            return {...state, ...{isLoggedIn : true}, ...action.payload}
        },
        resetToOriginal : () => {
            return initialState
        }
    }
});


export const {logIn, resetToOriginal} = user.actions;

export default user.reducer;