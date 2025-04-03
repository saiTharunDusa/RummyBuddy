import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import allPlayers from "./reducers/allPlayers";
import user from "./reducers/user";


const rootReducer = combineReducers({
    allPlayers : allPlayers,
    user : user,
})

const store = configureStore({
    reducer : rootReducer,
    middleware : getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck : false,
        });
    },
})

export default store;