import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FormData from "form-data";
import axios from "axios";
import { RootState } from "../../app/store";

export interface SettingsState {
  warriors: {
    id: number;
    name: string;
    hp: number;
    skills: null;
  }[];
  getWarriorserror: string | null;
  getWarriorsStatus: string;
  addWarriorError: string | null;
  addWarriorStatus: string;
}

const initialState: SettingsState = {
  warriors: [],
  getWarriorserror: null,
  getWarriorsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  addWarriorError: null,
  addWarriorStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const addWarrior: any = createAsyncThunk(
  "settings/addWarrior",
  async ({ name, hp }: { name: string; hp: string }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("HealthPoint", hp);

    const response = await axios({
      method: "post",
      url: "https://projectone.proxolab.com/api/warriors",
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

export const getWarriors: any = createAsyncThunk(
  "settings/getWarriors",
  async () => {
    const response = await axios({
      method: "get",
      url: "https://projectone.proxolab.com/api/warriors",
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

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWarriors.pending, (state) => {
        state.getWarriorsStatus = "loading";
      })
      .addCase(getWarriors.fulfilled, (state, action) => {
        state.getWarriorsStatus = "succeeded";
        console.log(action.payload.data);
        state.warriors = action.payload.data;
      })
      .addCase(getWarriors.rejected, (state, action) => {
        state.getWarriorsStatus = "failed";
        state.getWarriorserror = action.error.message;
      })

      .addCase(addWarrior.pending, (state) => {
        state.addWarriorStatus = "loading";
      })
      .addCase(addWarrior.fulfilled, (state, action) => {
        state.addWarriorStatus = "succeeded";
        const newWarrior = {
          id: action.payload.data.id,
          name: action.payload.data.name,
          hp: action.payload.data.hp,
          skills: action.payload.data.skills,
        };
        console.log(action.payload.data);
        state.warriors.push(newWarrior);
      })
      .addCase(addWarrior.rejected, (state, action) => {
        state.addWarriorStatus = "failed";
        state.addWarriorError = action.error.message;
      });
  },
});

export const selectWarriors = (state: RootState) => state.settings.warriors;
export const selectGetWarriorStatus = (state: RootState) =>
  state.settings.getWarriorsStatus;

// export const { addWarrior } = settingsSlice.actions;

export default settingsSlice.reducer;
