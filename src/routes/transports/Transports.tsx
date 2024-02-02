import React, { memo, useEffect } from 'react';
import BlankTips from '@/components/layout/blank';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TaskManager from '@/utils/TaskManager';
import Task, { TaskStatus } from '@/utils/Task';
import { formatFileSize } from '@/utils/Tool';
import { deleteTransport, Job, updateTransports } from '@/store/reducerSlice/transport';

const Transports = memo(() => {

  // const { userinfo } = useAppSelector(state => state.setting);
  const { transports } = useAppSelector(state => state.transport);
  const dispather = useAppDispatch();
  

  // if (!userinfo) {
  //   return <BlankTips />;
  // }

  const mergeTaskDateToTransport = (instance: TaskManager) => {
    const transTmps = transports.map(transTmp => {
      const findTask = instance.tasks.find(v => (v.uuid === transTmp.uuid && v.taskStatus !== transTmp.status));
      if (!findTask) return transTmp;
      return {
        ...transTmp,
        status: findTask.taskStatus,
      };
    });
    dispather(updateTransports(transTmps));
  }

  const initTaskLisiners = () => {
    const instance = TaskManager.getInstance();
    mergeTaskDateToTransport(instance);
  };

  useEffect(() => {
    const instance = TaskManager.getInstance();
    // 初始化时需要去taskmanager里面获取传输列表里面任务的最新状态。
    mergeTaskDateToTransport(instance);
    instance.addListener('taskUpdate', initTaskLisiners);
    return () => {
      instance.removeListener('taskUpdate', initTaskLisiners);
    }
  }, []);

  const deleteHandle = (job?: Job) => {
    dispather(deleteTransport(job?.uuid));
  };

  const stopHandle = (job: Job) => {
    TaskManager.getInstance().stopTask(job.uuid);
  }

  const restartHandle = (job: Job) => {
    TaskManager.getInstance().startTask(job.uuid);
  }



  return <div className='w-full flex flex-col'>
  <div className="border-0 border-b border-solid border-base-200 sticky top-0 p-6 z-[2] app-region flex justify-between">
    <h3 className='h-8 leading-8 select-none'>传输列表</h3>
    <div className='join reset-app-region'>
      {/* <button className='btn btn-sm join-item btn-warning'>全部停止</button>
      <button className='btn btn-sm join-item btn-info'>全部启动</button> */}
      <button className='btn btn-sm join-item' onClick={() => {
        deleteHandle();
      }}>清空列表</button>
    </div>
  </div>
  <div className='p-6 pr-3 flex-1 relative overflow-auto'>
  <div className="h-full w-full overflow-y-auto custom-scrollbar">
  <table className="table table-pin-rows">
      {/* head */}
      <thead>
        <tr>
          {/* <th>序号</th> */}
          <th>文件名</th>
          <th>状态</th>
          <th>时间</th>
          <th>文件大小</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {transports.length === 0 && <tr key="empty">
          <td colSpan={6}>
            <div className='py-10 text-center text-gray-600'>上传任务为空</div>
          </td>
        </tr>}
        {/* row 1 */}
        {transports.map((v, index) => <tr className='hover' key={v.uuid}>
          {/* <th>{index + 1}</th> */}
          <td>
            <div className="tooltip tooltip-primary" data-tip={v.filepath}>
              <span>{v.filename}</span>
            </div>
          </td>
          <td className='min-w-28'>
            <RenderStatus transport={v} />
          </td>
          <td>{new Date(v.createdate).toLocaleString()}</td>
          <td>{formatFileSize(v.filesize, true)}</td>
          <td className='w-28'>
            <div className='join'>
              <button
                className={`btn btn-xs btn-primary btn-outline join-item ${v.status === TaskStatus.uploading ? 'btn-disabled' : ''}`}
                onClick={() => deleteHandle(v)}>删除</button>
              {v.status === TaskStatus.uploading && <button
                className='btn btn-xs btn-primary btn-outline join-item'
                onClick={() => stopHandle(v)}>停止</button>}
              {v.status === TaskStatus.stop && <button
                className='btn btn-xs btn-primary btn-outline join-item'
                onClick={() => restartHandle(v)}>继续</button>}
            </div>
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
  </div>
</div>
});

export default Transports;

const RenderStatus = memo(({ transport }: { transport: Job}) => {
  if (transport.status === TaskStatus.idle) {
    return <div className="badge badge-neutral badge-outline">准备中</div>
  }
  if (transport.status === TaskStatus.wait) {
    return <div className="badge">队列中</div>
  }
  if (transport.status === TaskStatus.stop) {
    return <div className="badge badge-ghost">已停止</div>
  }
  if (transport.status === TaskStatus.resolveing) {
    return <div className="badge badge-info">解析中</div>
  }
  if (transport.status === TaskStatus.uploading) {
    return <div className='flex items-center gap-1 text-xs'>
    <span className="loading loading-spinner loading-sm text-primary"></span>
    上传中
  </div>
  }
  if (transport.status === TaskStatus.success) {
    return <div className="badge badge-success text-base-content">已完成</div>
  }
  if (transport.status === TaskStatus.error) {
    return <div className="badge badge-error">失败</div>
  }
  return <></>
})
