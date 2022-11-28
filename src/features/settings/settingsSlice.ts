import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FormData from "form-data";
import axios from "axios";
import { RootState } from "../../app/store";
import { Skill, Warrior } from "../../app/types";

export interface SettingsState {
  warriors: Warrior[];
  getWarriorsError?: string | null;
  getWarriorsStatus: string;
  addWarriorError?: string | null;
  addWarriorStatus: string;
  deleteWarriorError?: string | null;
  deleteWarriorStatus: string;
  addSkillError?: string | null;
  addSkillStatus: string;
  deleteSkillError?: string | null;
  deleteSkillStatus: string;
}

const initialState: SettingsState = {
  warriors: [],
  getWarriorsError: null,
  getWarriorsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  addWarriorError: null,
  addWarriorStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  deleteWarriorError: null,
  deleteWarriorStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  addSkillError: null,
  addSkillStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  deleteSkillError: null,
  deleteSkillStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
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
        return JSON.parse(response.request.response);
      })
      .catch(function (err) {
        console.log(err.message);
      });

    return response;
  }
);

export const deleteWarrior: any = createAsyncThunk(
  "settings/deleteWarrior",
  async (id: number) => {
    const formData = new FormData();
    formData.append("id", id);
    const response = await axios({
      method: "delete",
      url: "https://projectone.proxolab.com/api/warriors",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "probnet-api-key":
          "wyaSV9F8zFAYeOIfD6fygn9BDyPqP5DCg7DbDBWv6qJl27ZokDeTWzkgou2yLz9X",
      },
    })
      .then(function (response) {
        return JSON.parse(response.request.response);
      })
      .catch(function (err) {
        console.log(err.message);
      });

    return response;
  }
);

export const deleteSkill: any = createAsyncThunk(
  "settings/deleteSkill",
  async (id: number) => {
    const formData = new FormData();
    formData.append("id", id);
    const response = await axios({
      method: "delete",
      url: "https://projectone.proxolab.com/api/skills",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "probnet-api-key":
          "wyaSV9F8zFAYeOIfD6fygn9BDyPqP5DCg7DbDBWv6qJl27ZokDeTWzkgou2yLz9X",
      },
    })
      .then(function (response) {
        return JSON.parse(response.request.response);
      })
      .catch(function (err) {
        console.log(err.message);
      });

    return response;
  }
);

export const addSkill: any = createAsyncThunk(
  "settings/addSkill",
  async ({ skill, skill_index }: { skill: Skill; skill_index: number }) => {
    const formData = new FormData();
    formData.append("WarriorID", skill.warrior_id);
    formData.append("SkillType", skill.skill_type);
    formData.append("SkillTypeOption", skill.skill_type_option);
    formData.append("point", skill.point);
    const response = await axios({
      method: "post",
      url: "https://projectone.proxolab.com/api/skills",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "probnet-api-key":
          "wyaSV9F8zFAYeOIfD6fygn9BDyPqP5DCg7DbDBWv6qJl27ZokDeTWzkgou2yLz9X",
      },
    })
      .then(function (response) {
        return {
          skill: JSON.parse(response.request.response),
          skill_index: skill_index,
        };
      })
      .catch(function (err) {
        console.log(err.message);
      });

    return response;
  }
);

export const getOpponent: any = createAsyncThunk(
  "settings/getOpponent",
  async (id: number) => {
    const formData = new FormData();
    formData.append("id", id);
    const response = await axios({
      method: "delete",
      url: "https://projectone.proxolab.com/api/warriors",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "probnet-api-key":
          "wyaSV9F8zFAYeOIfD6fygn9BDyPqP5DCg7DbDBWv6qJl27ZokDeTWzkgou2yLz9X",
      },
    })
      .then(function (response) {
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
  reducers: {
    setSkill: {
      reducer(
        state,
        action: PayloadAction<{
          warrior: Warrior;
        }>
      ) {
        const { warrior } = action.payload;
        state.warriors = state.warriors.map((w) =>
          w.id === warrior.id ? warrior : w
        );
      },
      prepare(warrior: Warrior) {
        return { payload: { warrior } };
      },
    },

    removeSkill: {
      reducer(
        state,
        action: PayloadAction<{
          warrior: Warrior;
        }>
      ) {
        const { warrior } = action.payload;
        state.warriors = state.warriors.map((w) =>
          w.id === warrior.id ? warrior : w
        );
      },
      prepare(warrior: Warrior) {
        return { payload: { warrior } };
      },
    },

    updateSkill: {
      reducer(
        state,
        action: PayloadAction<{ id: number; obj: any; skill_index: number }>
      ) {
        const { id, obj, skill_index } = action.payload;
        const warrior = state.warriors.find((warrior) => warrior.id === id);
        if (warrior) {
          warrior.skills[skill_index] = {
            ...warrior.skills[skill_index],
            ...obj,
          };
        }
      },
      prepare(id: number, obj: any, skill_index) {
        return { payload: { id, obj, skill_index } };
      },
    },
  },
  extraReducers(builder) {
    builder
      // ------------- GET WARRIORS -------------
      .addCase(getWarriors.pending, (state) => {
        state.getWarriorsStatus = "loading";
      })
      .addCase(getWarriors.fulfilled, (state, action) => {
        state.getWarriorsStatus = "succeeded";
        state.warriors = action.payload.data;
      })
      .addCase(getWarriors.rejected, (state, action) => {
        state.getWarriorsStatus = "failed";
        state.getWarriorsError = action.error.message;
      })

      // ------------- ADD WARRIOR -------------
      .addCase(addWarrior.pending, (state) => {
        state.addWarriorStatus = "loading";
      })
      .addCase(addWarrior.fulfilled, (state, action) => {
        state.addWarriorStatus = "succeeded";
        const newWarrior = {
          id: action.payload.data.id,
          name: action.payload.data.name,
          hp: action.payload.data.hp,
          skills: [],
        };
        state.warriors.push(newWarrior);
      })
      .addCase(addWarrior.rejected, (state, action) => {
        state.addWarriorStatus = "failed";
        state.addWarriorError = action.error.message;
      })

      // ------------- DELETE WARRIOR -------------
      .addCase(deleteWarrior.pending, (state) => {
        state.deleteWarriorStatus = "loading";
      })
      .addCase(deleteWarrior.fulfilled, (state, action) => {
        state.deleteWarriorStatus = "succeeded";
        const deletedWarrior = action.payload.data;
        const warriors = state.warriors;
        state.warriors = warriors.filter(
          (warrior) => warrior.id !== deletedWarrior.id
        );
      })
      .addCase(deleteWarrior.rejected, (state, action) => {
        state.deleteWarriorStatus = "failed";
        state.deleteWarriorError = action.error.message;
      })

      // ------------- ADD SKILL -------------
      .addCase(addSkill.pending, (state) => {
        state.addSkillStatus = "loading";
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.addSkillStatus = "succeeded";
        const { skill, skill_index } = action.payload;
        const warrior = state.warriors.find(
          (warrior) => warrior.id === skill.data.warrior_id
        );
        if (warrior && skill.status !== "error") {
          warrior.skills[skill_index] = skill.data;
        }
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.addSkillStatus = "failed";
        state.addSkillError = action.error.message;
      })

      // ------------- DELETE SKILL -------------
      .addCase(deleteSkill.pending, (state) => {
        state.deleteSkillStatus = "loading";
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.deleteSkillStatus = "succeeded";
        const deletedSkill = action.payload.data;
        const warriors = state.warriors;
        const warrior = warriors.find(
          (warrior) => warrior.id === deletedSkill.warrior_id
        );
        if (warrior) {
          warrior.skills = warrior.skills.filter(
            (skill: Skill) => skill.id !== deletedSkill.id
          );
        }

        const newWarriors = state.warriors.map((w) =>
          w.id === warrior?.id ? warrior : w
        );
        state.warriors = newWarriors;
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.deleteSkillStatus = "failed";
        state.deleteSkillError = action.error.message;
      });
  },
});

export const selectWarriors = (state: RootState) => state.settings.warriors;
export const selectGetWarriorStatus = (state: RootState) =>
  state.settings.getWarriorsStatus;

export const { setSkill, updateSkill, removeSkill } = settingsSlice.actions;

export default settingsSlice.reducer;
