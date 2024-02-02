import { getUserInfo } from '@/utils/OctokitInstance';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BucketState {
  token: string | null,
  userinfo: any | null,
  loadingUserinfo: string;
}

const initialState: BucketState = {
  token: null,
  userinfo: null,
  loadingUserinfo: 'idle',
};


export const GetUserInfo = createAsyncThunk('setting/userinfo', async (token: string) => {
  const data = await getUserInfo(token);
  return data;
});

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(GetUserInfo.pending, (state, action) => {
        state.loadingUserinfo = 'loading';
        state.token = action.meta.arg;
      })
      .addCase(GetUserInfo.fulfilled, (state, action) => {
        state.userinfo = action.payload.data;
        state.loadingUserinfo = 'success';
      })
      .addCase(GetUserInfo.rejected, (state) => {
        state.userinfo = null;
        state.loadingUserinfo = 'error';
      })
});


export const { updateToken } = settingSlice.actions;

export default settingSlice.reducer;
