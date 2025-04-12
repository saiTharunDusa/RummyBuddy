import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameId: null,
    status : null,
    drop: 0,
    middleDrop: 0,
    fullCount: 0,
    totalGameScore: 0,
    totalGameAmount: 0,
    totalGameAmountFixed : 0,
    players: [],
    rounds: [],
    totalScore : [],
    inGameOutPlayers : [],
    inGameDangerPlayers : [],
    reEntryRounds : [],
    dealerId : 0,
    previousDealerId : -1,
    playersLifeCycle : [],
}

const gameState = createSlice({
    name : 'gameSettings',
    initialState : initialState,
    reducers : {
        initializeGame : (state, action) => {
            Object.assign(state, action.payload);
        },
        setStatus : (state, action) => {
            state.status = action.payload;
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
        setOutPlayers : (state, action) => {
            state.inGameOutPlayers = action.payload;
        },
        setDangerPlayers : (state, action) => {
            state.inGameDangerPlayers = action.payload;
        },
        setReEntryRounds: (state, action) => {
            if (!state.reEntryRounds) {
              state.reEntryRounds = [];
            }
            state.reEntryRounds = [...state.reEntryRounds, action.payload];
        },
        setDealerId : (state, action) => {
            state.dealerId = action.payload;
        },
        setPreviousDealerId : (state, action) => {
            state.previousDealerId = action.payload;
        },
        setPlayersLifeCycle : (state, action) => {
            state.playersLifeCycle = action.payload;
        },
        resetGameBoard: (state) => {
            Object.assign(state, initialState);
        }
        
    }
})

export const {initializeGame, setStatus, addRounds, addTotals, resetGameBoard, setRounds, setOutPlayers, setDangerPlayers, setReEntryRounds, setDealerId, setPlayersLifeCycle, setPreviousDealerId } = gameState.actions;

export default gameState.reducer;