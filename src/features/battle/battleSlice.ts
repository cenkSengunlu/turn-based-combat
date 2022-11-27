import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface BattleState {
  isBattle: boolean;
  selectedWarrior: {
    id: number;
    name: string;
    hp: number;
    skills: any;
  };
  opponent: {
    id: number;
    name: string;
    hp: number;
    skills: any;
  };
  winner: string | null;
  startBattleError?: string | null;
  startBattleStatus: string;
}

const initialState: BattleState = {
  isBattle: false,
  selectedWarrior: {
    id: 0,
    name: "",
    hp: 0,
    skills: [],
  },
  opponent: {
    id: 0,
    name: "",
    hp: 0,
    skills: [],
  },
  winner: null,
  startBattleError: null,
  startBattleStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const startBattle: any = createAsyncThunk(
  "settings/startBattle",
  async (id: number, selected_warrior: any) => {
    const formData = new FormData();
    // formData.append("id", String(id));
    const response = await axios({
      method: "get",
      url: `https://projectone.proxolab.com/api/warriors/${id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "probnet-api-key":
          "wyaSV9F8zFAYeOIfD6fygn9BDyPqP5DCg7DbDBWv6qJl27ZokDeTWzkgou2yLz9X",
      },
    })
      .then(function (response) {
        console.log(JSON.parse(response.request.response));
        return {
          opponent: JSON.parse(response.request.response),
          selected_warrior: selected_warrior,
        };
      })
      .catch(function (err) {
        console.log(err.message);
      });

    return response;
  }
);

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // ------------- START BATTLE -------------
      .addCase(startBattle.pending, (state) => {
        state.startBattleStatus = "loading";
      })
      .addCase(startBattle.fulfilled, (state, action) => {
        state.startBattleStatus = "succeeded";
        console.log(action.payload.opponent.data);
        state.opponent = action.payload.opponent.data;
        state.selectedWarrior = action.payload.selected_warrior;
        state.isBattle = true;
      })
      .addCase(startBattle.rejected, (state, action) => {
        state.startBattleStatus = "failed";
        state.startBattleError = action.error.message;
      });
  },
});

export const selectIsBattle = (state: RootState) => state.battle.isBattle;

// export const { startBattle } = battleSlice.actions;

export default battleSlice.reducer;
