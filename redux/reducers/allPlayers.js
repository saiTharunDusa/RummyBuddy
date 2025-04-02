import {createSlice} from "@reduxjs/toolkit"

const allPlayers = createSlice({
    name : 'allPlayers',
    initialState : {
        list : []
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
        }
    }
});

export const {setPlayers, addPlayer, removePlayer, editPlayer} = allPlayers.actions;

export default allPlayers.reducer;