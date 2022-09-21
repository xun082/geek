import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUserInfo } from "@/services/login";
import { getUserProfile } from "@/services/profile";

interface userInfoType {
  art_count: number;
  fans_count: number;
  follow_count: number;
  id: string;
  like_count: number;
  name: string;
  photo: string;
}

interface userProfileType {
  birthday: Date;
  gender: number;
  id: string;
  intro: null | string;
  mobile: string;
  name: string;
  photo: string;
}

const initialState = {
  userInfo: {} as userInfoType,
  userProfile: {} as userProfileType,
};

// 获取用户个人信息
export const getUserInfoAction = createAsyncThunk("info", async () => {
  const result = await getUserInfo();
  return result.data;
});

// 获取用户生日信息
export const getUserProfileAction = createAsyncThunk("profile", async () => {
  const result = await getUserProfile();
  return result.data;
});

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 获取用户个人信息实例
      .addCase(getUserInfoAction.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
      })
      .addCase(getUserProfileAction.fulfilled, (state, { payload }) => {
        state.userProfile = payload;
      });
  },
});

export default counterSlice.reducer;
