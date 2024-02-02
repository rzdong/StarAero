import { BUCKET_PREFIX, PLACEHOLDER_FILENAME } from '@/configs/const';
import { createRepository, deleteObject, getObject, getRepositories, ICreateRepo, IDeleteObject, IGetObject } from '@/utils/OctokitInstance';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TipStatus {
  idle,
  loading,
  empty,
  error,
  success,
}

export enum DeleteStatus {
  idle,
  loading,
  error,
  success,
}

export interface ObjectState {
  objects: any[],
  status: TipStatus,
}

const initialState: ObjectState = {
  objects: [],
  status: TipStatus.idle,
};

/** 获取对象列表 */
export const GetObjects = createAsyncThunk('object/objects', async (req: IGetObject) => {
  const data = await getObject(req);
  return data;
});

export const DeleteObject = createAsyncThunk('object/delete', async (req: IDeleteObject) => {
  const data = await deleteObject(req);
  return data;
});


export const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {
    updateObjects: (state, action: PayloadAction<any[]>) => {
      state.objects = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(GetObjects.pending, (state, action) => {
        if (action.meta.arg.needLoading) {
          state.status = TipStatus.loading;
        }
      })
      .addCase(GetObjects.fulfilled, (state, action) => {
        const resData = action.payload.data;
        const files = (resData as any[]).filter(v => v.name !== PLACEHOLDER_FILENAME);
        if (files.length === 0) {
          state.status = TipStatus.empty;
          state.objects = []
          return;
        }
        state.objects = files;
        state.status = TipStatus.success;
      })
      .addCase(GetObjects.rejected, (state, action) => {
        state.status = TipStatus.error;
        if (action.error.message?.includes('empty')) {
          state.status = TipStatus.empty;
          state.objects = []
          return;
        }
      })
      .addCase(DeleteObject.pending, (state, action) => {
        const objs = state.objects;
        const filePath = action.meta.arg.path;
        const findObj = objs.find(v => v.path === filePath);
        findObj.status = DeleteStatus.loading;
        state.objects = objs;
      })
      .addCase(DeleteObject.fulfilled, (state, action) => {
        const objs = state.objects;
        const filePath = action.meta.arg.path;
        const findObjIndex = objs.findIndex(v => v.path === filePath);
        objs.splice(findObjIndex, 1);
        state.objects = objs;
      })
});


export const { updateObjects } = objectSlice.actions;

export default objectSlice.reducer;
