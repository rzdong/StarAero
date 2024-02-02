import React, { memo, useEffect, useMemo, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import BucketSelect from './components/BucketSelect';
import AddBucket from './components/AddBucket';
import BreadCrumbs from './components/BreadCrumbs';
import FileListContainer from './components/FileListContainer';
import { uploadFile } from '@/utils/OctokitInstance';
import AddFold from './components/AddFold';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { DeleteObject, GetObjects } from '@/store/reducerSlice/object';
import { GetBuckets, updateBreadcrumbs } from '@/store/reducerSlice/bucket';
import ListType from './components/ListType';
import SearchInput from './components/SearchInput';
import BlankTips from '@/components/layout/blank';
import TaskManager from '@/utils/TaskManager';
import Task, { TaskStatus } from '@/utils/Task';
import { v4 as uuidv4 } from 'uuid';
import { appendTransport } from '@/store/reducerSlice/transport';

const Storages = () => {
  const { currentBucket, breadcrumbs } = useAppSelector(state => state.bucket);
  const { userinfo } = useAppSelector(state => state.setting);
  const { objects, status } = useAppSelector(state => state.object);
  
  const [search, setSearch] = useState('');


  const dispatcher = useAppDispatch();

  if (!userinfo) {
    return <BlankTips />;
  }

  const getFiles = (needLoading = true) => {
    dispatcher(GetObjects({
      owner: currentBucket.owner?.login,
      repo: currentBucket.name,
      path: breadcrumbs.join('/'),
      needLoading,
    }));
  };

  useEffect(() => {
    if (currentBucket?.name && breadcrumbs) {
      getFiles();
      return;
    }
    dispatcher(GetBuckets());
  }, [
    breadcrumbs, // 面包屑
    currentBucket?.name, // 当前存储库
  ]);

  /** 批量上传文件事件 */
  const onFiles = (files: File[]) => {
    const owner = currentBucket?.owner.login;
    const repo = currentBucket?.name;
    const pathPrefix = breadcrumbs.length === 0 ? '' : `${breadcrumbs.join('/')}/`;
    files.forEach(async file => {
      const uuid = uuidv4();
      // 启动上传任务
      TaskManager.getInstance().addTask({
        owner,
        repo,
        file,
        uuid,
        uploadPath: `${pathPrefix}${file.name}`,
      })
      const { name, size, type } = file;
      // 记录传输列表
      dispatcher(appendTransport({
        uuid,
        filename: name,
        filesize: size,
        filetype: type,
        filepath: `${pathPrefix}${file.name}`,
        filerepo: repo,
        status: TaskStatus.idle,
        createdate: Date.now(),
      }));
    })
  };

  const taskUploadedHandle = (task: Task) => {
    // 如果上传完成的文件是当前显示目录, 则刷新
    if (task.uploadPath.startsWith(breadcrumbs.join('/'))) {
      getFiles(false);
    }
  };

  useEffect(() => {
    TaskManager.getInstance().addListener('taskUploaded', taskUploadedHandle);
    return () => {
      TaskManager.getInstance().removeListener('taskUploaded', taskUploadedHandle);
    }
  }, []);


  /** 点击文件夹 */
  const onClickFoldHandle = (foldName: string) => {
    dispatcher(updateBreadcrumbs([...breadcrumbs, foldName]));
  };

  const onDelete = (file: any) => {
    const owner = currentBucket?.owner.login;
    const repo = currentBucket?.name;
    const { path, sha } = file;
    dispatcher(DeleteObject({
      owner,
      repo,
      path,
      sha,
    }));
  }

  return <div className='w-full flex flex-col'>
    <div className='p-6 border-0 sticky top-0 z-10 border-b border-base-200 border-solid flex justify-between app-region bg-base-100'>
      <div className='flex items-center'>
        <span className='text-sm font-bold select-none'>存储库：</span>
        <BucketSelect />
        <AddBucket />
      </div>
      <SearchInput value={search} onChange={(v: string) => setSearch(v)} />
    </div>
      <div className='flex justify-between p-6 pb-0'>
        <BreadCrumbs breadcrumbs={breadcrumbs} setBreadcrumbs={(bs) => {
          setSearch('');
          dispatcher(updateBreadcrumbs([...bs]));
        }} />
        <div className='flex items-center gap-4'>
          <div className='join'>
            <label className='form-control btn btn-primary btn-sm join-item'>
              上传文件
              <input type="file" multiple hidden onChange={(e) => {
                onFiles(Array.from(e.target.files || []));
              }} />
            </label>
            <AddFold
              owner={currentBucket?.owner.login}
              repo={currentBucket?.name}
              breadcrumbs={breadcrumbs}
              onSuccess={getFiles} />
          </div>
          <ListType />
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <FileListContainer
          tipStatus={status}
          files={objects.filter(v => fuzzyFile(v, search))}
          onFiles={onFiles}
          onClickFold={onClickFoldHandle}
          onDelete={onDelete}
        />
      </DndProvider>     
  </div>
};

export default memo(Storages);

/**
 * 模糊查找是否查找到结果
 * file.name 里是否有查询结果
 * @param {File} file
 * @param {String} search
 */
const fuzzyFile = (file: File, search: string) => {
  return (file.name as string).toLowerCase().includes(search.toLowerCase());
}


