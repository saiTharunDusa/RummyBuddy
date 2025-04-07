import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import allPlayers from "./reducers/allPlayers";
import user from "./reducers/user";
import selectedPlayers from "./reducers/selectedPlayers";
import gameState from "./reducers/gameState";


const rootReducer = combineReducers({
    allPlayers : allPlayers,
    user : user,
    selectedPlayers : selectedPlayers,
    gameState : gameState
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