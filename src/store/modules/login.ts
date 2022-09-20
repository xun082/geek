import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { sendLogin } from "@/services/login";
import { setTokenInfo } from "@/utils/storage";
import { getTokenInfo } from "@/utils/storage";

export interface Token {
  token: string;
  refresh_token: string;
}

interface LoginProps {
  mobile: string;
  code: string;
}

const initialState: Token = {
  token: getTokenInfo().token || "",
  refresh_token: getTokenInfo().refresh_token || "",
};

export const LoginAction = createAsyncThunk(
  "code",
  async (data: LoginProps) => {
    const result = await sendLogin(data);

    return result;
  }
);

export const counterSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginAction.fulfilled, (state, { payload }) => {
      const { token, refresh_token } = payload.data;
      state.token = token;
      state.refresh_token = refresh_token;

      setTokenInfo(payload.data);
    });
  },
});

export default counterSlice.reducer;
