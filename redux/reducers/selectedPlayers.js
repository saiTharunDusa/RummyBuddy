import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list : []
}

const selectedPlayers = createSlice({
    name: 'selectedPlayers',
    initialState: {
      list: [],
    },
    reducers: {
      selectPlayer: (state, action) => {
        state.list = action.payload; // replaces with selected ones
      },
      resetAllSelectedPlayers : (state, action) => {
        return initialState
      }
    },
  });
  
  export const { selectPlayer, resetAllSelectedPlayers } = selectedPlayers.actions;
  export default selectedPlayers.reducer;