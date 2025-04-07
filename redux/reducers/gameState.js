import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameId: null,
    drop: 0,
    middleDrop: 0,
    fullCount: 0,
    totalGameScore: 0,
    totalGameAmount: 0,
    players: [],
    rounds: [],
    totalScore : []
}

const gameState = createSlice({
    name : 'gameSettings',
    initialState : initialState,
    reducers : {
        initializeGame : (state, action) => {
            Object.assign(state, action.payload);
        },
        setRounds : (state, action) => {
            state.rounds = action.payload
        },
        addRounds : (state, action) => {
            state.rounds.push(action.payload)
        },
        addTotals : (state, action) => {
            state.totalScore = action.payload;
        },
        resetGameBoard : () => initialState
    }
})

export const {initializeGame, addRounds, addTotals, resetGameBoard, setRounds} = gameState.actions;

export default gameState.reducer;