import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUserInfo } from "@/services/login";

interface userInfoType {
  art_count: number;
  fans_count: number;
  follow_count: number;
  id: string;
  like_count: number;
  name: string;
  photo: string;
}

const initialState = {
  userInfo: {} as userInfoType,
};

// 获取用户个人信息
export const getUserInfoAction = createAsyncThunk("info", async () => {
  const result = await getUserInfo();
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
      });
  },
});

export default counterSlice.reducer;
