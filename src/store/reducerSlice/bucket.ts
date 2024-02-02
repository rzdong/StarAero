import { BUCKET_PREFIX } from '@/configs/const';
import { createRepository, getRepositories, ICreateRepo } from '@/utils/OctokitInstance';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BucketState {
  buckets: any[],
  breadcrumbs: string[],
  currentBucket: any,
  listType: 'card' | 'list',
  status: 'idle' | 'loading',
}

const initialState: BucketState = {
  buckets: [],
  breadcrumbs: [],
  listType: 'card',
  currentBucket: null,
  status: 'idle',
};

/** 存储库列表 */
export const GetBuckets = createAsyncThunk('bucket/buckets', async () => {
  const data = await getRepositories();
  return data;
});

/** 创建存储库 */
export const CreateBuckets = createAsyncThunk('bucket/create', async (createRepo: ICreateRepo) => {
  const data = await createRepository(createRepo);
  return data;
});


export const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    updateBuckets: (state, action: PayloadAction<any[]>) => {
      state.buckets = action.payload;
    },
    updateSelected: (state, action: PayloadAction<string>) => {
      const find = state.buckets.find(bucket => bucket.name === action.payload);
      state.currentBucket = find;
      state.breadcrumbs = [];
    },
    updateBreadcrumbs: (state, action: PayloadAction<any[]>) => {
      state.breadcrumbs = action.payload;
    },
    updateListType: (state, action: PayloadAction<'card' | 'list'>) => {
      state.listType = action.payload;
    },

  },
  extraReducers: (builder) =>
    builder
      .addCase(GetBuckets.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetBuckets.fulfilled, (state, action) => {
        state.status = 'idle';
        const data = action.payload.data;
        if (data.length > 0) {
          const buckets = data.filter(bucket => bucket.name.startsWith(BUCKET_PREFIX));
          state.buckets = buckets;
          return;
        }
        state.buckets = [];
      })
      .addCase(GetBuckets.rejected, state => {
        state.status = 'idle'
      })
});


export const { updateBuckets, updateSelected, updateBreadcrumbs, updateListType } = bucketSlice.actions;

export default bucketSlice.reducer;
