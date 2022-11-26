import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface BattleState {
  activeTab: string;
}

const initialState: BattleState = {
  activeTab: "Savaş",
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setActiveTab: {
      reducer(state, action: PayloadAction<{ activeTab: string }>) {
        state.activeTab = action.payload.activeTab;
      },
      prepare(activeTab: string) {
        return { payload: { activeTab } };
      },
    },
  },
});

export const selectActiveTab = (state: RootState) => state.battle.activeTab;

export const { setActiveTab } = battleSlice.actions;

export default battleSlice.reducer;
