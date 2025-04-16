import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import allPlayers from "./reducers/allPlayers";
import user from "./reducers/user";
import {persistReducer, persistStore} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import selectedPlayers from "./reducers/selectedPlayers";
import gameState from "./reducers/gameState";


const rootReducer = combineReducers({
    allPlayers : allPlayers,
    user : user,
    selectedPlayers : selectedPlayers,
    gameState : gameState,
})

const configuration = {
    key : 'root',
    storage : AsyncStorage,
    timeout: 10000,
    version : 1
}

const persistedReducer = persistReducer(configuration, rootReducer);


const store = configureStore({
    reducer : persistedReducer,
    middleware : getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck : false,
        });
    },
})

export default store;
export const persistor = persistStore(store);
