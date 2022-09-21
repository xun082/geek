import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { sendLogin } from "@/services/login";
import { setTokenInfo, getTokenInfo } from "@/utils/storage";

interface LoginProps {
  mobile: string;
  code: string;
}

interface initType {
  token: string;
  refresh_token: string;
}

const initialState = {
  token: getTokenInfo().token || "",
  refresh_token: getTokenInfo().refresh_token || "",
} as initType;

// 登陆
export const LoginAction = createAsyncThunk(
  "code",
  async (data: LoginProps) => {
    const result = await sendLogin(data);
    return result;
  }
);

const counterSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 登录实例
      .addCase(LoginAction.fulfilled, (state, { payload }) => {
        const { token, refresh_token } = payload.data;
        state.token = token;
        state.refresh_token = refresh_token;
        setTokenInfo(payload.data);
      });
  },
});

export default counterSlice.reducer;
