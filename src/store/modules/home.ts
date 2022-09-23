import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUserChannels } from "@/services/home";
import { getLocalChannels, hasToken, setLocalChannels } from "@/utils/storage";

export interface channelsType {
  id: number;
  name: string;
}

const initialState = {
  channels: [] as Array<channelsType>,
};

export const channelsAction = createAsyncThunk("channels", async () => {
  const result = await getUserChannels();
  if (hasToken()) {
    return result.data;
  } else {
    const channels = getLocalChannels();
    if (channels) {
      // 没有token,但本地有
      return channels;
    } else {
      // 没有token且本地没有
      return setLocalChannels(result.data);
    }
  }
});

export const counterSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(channelsAction.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
    });
  },
});

export default counterSlice.reducer;
