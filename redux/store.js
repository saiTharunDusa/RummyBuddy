import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import allPlayers from "./reducers/allPlayers";

const rootReducer = combineReducers({
    allPlayers : allPlayers,
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