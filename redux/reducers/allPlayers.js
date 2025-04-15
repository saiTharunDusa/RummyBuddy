import {createSlice} from "@reduxjs/toolkit"
import { act } from "react";

const initialState = {
    list : []
}

const allPlayers = createSlice({
    name : 'allPlayers',
    initialState : {
        list : [],
        lastVisible : null,
        isEndReached : false,
    },
    reducers : {
        setPlayers : (state, action) => {
            state.list = action.payload
        },
        addPlayer : (state, action) =>{
            state.list.push(action.payload);
        },
        removePlayer : (state, action) => {
            state.list = state.list.filter(p => p.id !== action.payload)
        },
        editPlayer : (state, action) => {
            const {id, newName} = action.payload;
            const existing = state.list.find(p=>p.id === id)
            if(existing)
            {
                existing.name = newName
            }
        },
        setLastVisible : (state, action) => {
            state.lastVisible = action.payload
        },
        setIsEndReached : (state, action) => {
            state.isEndReached = action.payload
        },
        resetAllPlayers : (state, action) => {
            return initialState
        }
    }
});

export const {setPlayers, addPlayer, removePlayer, editPlayer, setLastVisible, setIsEndReached, resetAllPlayers} = allPlayers.actions;

export default allPlayers.reducer;