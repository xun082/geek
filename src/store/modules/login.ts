import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export interface Token {
  token: string;
  refresh_token: string;
}

const initialState: Token = {
  token: "",
  refresh_token: "",
};

const sendCode = () =>
  axios
    .get("http://localhost:3001/search?keywords=海阔天空")
    .then((res) => res);

export const getCode = createAsyncThunk("code", async () => {
  const res = await sendCode();
  return res;
});

export const counterSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCode.fulfilled, (state, action) => {
      console.log({ ...state });
      console.log(action);
    });
  },
});

export default counterSlice.reducer;
