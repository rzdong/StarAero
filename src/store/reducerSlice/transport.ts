import { TaskStatus } from '@/utils/Task';
import TaskManager from '@/utils/TaskManager';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Job {
  filename: string;
  filerepo: string;
  filepath: string;
  filesize: number;
  filetype: string;
  status: TaskStatus;
  createdate: number;
  uuid: string;
  progress?: boolean | number;
}

export interface TransportState {
  transports: Job[],
  uploadCount: number;
}

const initialState: TransportState = {
  transports: [],
  uploadCount: 0,
};


export const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    /** 更新传输列表 */
    updateTransports: (state, action: PayloadAction<any>) => {
      state.transports = action.payload;
    },
    /** 添加传输任务到队列顶部 */
    appendTransport: (state, action: PayloadAction<any>) => { // 增加一个传输任务记录
      state.transports = [action.payload, ...state.transports];
    },
    /** 删除某个传输任务 */
    deleteTransport: (state, action: PayloadAction<string | undefined>) => { // 增加一个传输任务记录
      if (action.payload) {
        const findIndex = state.transports.findIndex(v => v.uuid === action.payload );
        const temp = [...state.transports]
        temp.splice(findIndex, 1);
        state.transports = temp;
        TaskManager.getInstance().deleteTask(action.payload);
        return;
      }
      state.transports = [];
      TaskManager.getInstance().deleteTask();
    },
    /** 停止某个传输任务 */
    stopTransport: (state, action: PayloadAction<string>) => { // 增加一个传输任务记录
      const findIndex = state.transports.findIndex(v => v.uuid === action.payload );
      const temp = [...state.transports]
      temp[findIndex].status = TaskStatus.stop;
      state.transports = temp;
      TaskManager.getInstance().stopTask(action.payload);
    },
  },
});


export const {
  updateTransports,
  appendTransport,
  deleteTransport,
  stopTransport,
  // restartTransport
} = transportSlice.actions;

export default transportSlice.reducer;
