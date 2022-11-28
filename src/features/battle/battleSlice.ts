import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface BattleState {
  isBattle: boolean;
  turn: number;
  isYourTurn: boolean;
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
  warrior_move: number;
}

const initialState: BattleState = {
  isBattle: false,
  turn: 1,
  isYourTurn: false,
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
  winner: "",
  startBattleError: null,
  startBattleStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  warrior_move: 0,
};

export const startBattle: any = createAsyncThunk(
  "settings/startBattle",
  async (id: number) => {
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
        return JSON.parse(response.request.response);
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
  reducers: {
    setMove: {
      reducer(
        state,
        action: PayloadAction<{
          skill_type: number;
          skill_type_option: number;
          point: number;
        }>
      ) {
        const { skill_type, skill_type_option, point } = action.payload;
        const opponent = state.opponent;
        const selected_warrior = state.selectedWarrior;
        const opponent_move = skill_type === 1 ? 2 : 1;
        const opponent_move_option =
          Math.floor(Math.random() * 2) === 0 ? 1 : 2;
        const opponent_point = opponent.skills.find(
          (skill: any) =>
            skill.skill_type === opponent_move &&
            skill.skill_type_option === opponent_move_option
        ).point;

        if (skill_type === 1) {
          if (skill_type_option === opponent_move_option) {
            opponent.hp =
              point > opponent_point
                ? opponent.hp - (point - opponent_point)
                : opponent.hp;
          } else {
            opponent.hp -= point;
          }
          if (opponent.hp <= 0) {
            state.opponent.hp = 0;
            state.winner = selected_warrior.name;
          }
        } else {
          if (opponent_move_option === skill_type_option) {
            selected_warrior.hp =
              opponent_point > point
                ? selected_warrior.hp - (opponent_point - point)
                : selected_warrior.hp;
          } else {
            selected_warrior.hp -= opponent_point;
          }
          if (selected_warrior.hp <= 0) {
            state.selectedWarrior.hp = 0;
            state.winner = opponent.name;
          }
        }
        state.turn += 1;
        state.isYourTurn = !state.isYourTurn;
      },
      prepare(skill_type: number, skill_type_option: number, point: number) {
        return { payload: { skill_type, skill_type_option, point } };
      },
    },
    selectWarrior: {
      reducer(state, action: PayloadAction<{ warrior: any }>) {
        state.selectedWarrior = action.payload.warrior;
      },
      prepare(warrior: any) {
        return { payload: { warrior } };
      },
    },
  },
  extraReducers(builder) {
    builder
      // ------------- START BATTLE -------------
      .addCase(startBattle.pending, (state) => {
        state.startBattleStatus = "loading";
      })
      .addCase(startBattle.fulfilled, (state, action) => {
        state.startBattleStatus = "succeeded";
        const startTurn = Math.floor(Math.random() * 2);
        const selectedWarrior = state.selectedWarrior;
        const opponent = action.payload.data;
        state.isYourTurn = startTurn === 0 ? true : false;
        opponent.name =
          selectedWarrior.name === opponent.name
            ? `Doppelganger ${opponent.name}`
            : opponent.name;
        state.opponent = action.payload.data;
        state.isBattle = true;
      })
      .addCase(startBattle.rejected, (state, action) => {
        state.startBattleStatus = "failed";
        state.startBattleError = action.error.message;
      });
  },
});

export const selectIsBattle = (state: RootState) => state.battle.isBattle;
export const selectIsYourTurn = (state: RootState) => state.battle.isYourTurn;
export const selectStartBattleStatus = (state: RootState) =>
  state.battle.startBattleStatus;
export const selectSelectedWarrior = (state: RootState) =>
  state.battle.selectedWarrior;
export const selectTurn = (state: RootState) => state.battle.turn;
export const selectOpponent = (state: RootState) => state.battle.opponent;
export const selectWinner = (state: RootState) => state.battle.winner;

export const { setMove, selectWarrior } = battleSlice.actions;

export default battleSlice.reducer;
