import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getChannels } from "@/services/home";

interface channelsType {
  id: number;
  name: string;
}

const initialState = {
  channels: [] as channelsType[],
};

export const channelsAction = createAsyncThunk("channels", async () => {
  const result = await getChannels();
  return result.data;
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
