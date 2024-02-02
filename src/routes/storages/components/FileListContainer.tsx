import React, { useCallback } from 'react';

import { TipStatus } from '@/hooks/useGetContentByPath';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import CardList from './fileList/CardList';
import TableList from './fileList/TableList';
import { useAppSelector } from '@/store/store';

type FileListContainerProps = {
  tipStatus: TipStatus,
  files: any[],
  /** 选择了文件 */
  onFiles: (files: File[]) => void,
  onClickFold: (foldName: string) => void,
  onDelete: (fileName: string) => void
};

const FileListContainer = ({
  tipStatus,
  files,
  onFiles,
  onClickFold,
  onDelete,
}: FileListContainerProps) => {
  const { listType } = useAppSelector(state => state.bucket);

  const onDrop = useCallback((item: any) => {
    if (item) {
      const files = item.files;
      onFiles(files)
    }
  }, []);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop: onDrop,
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    }),
    [],
  )

  return <div
    className={`flex-1 flex flex-col relative p-6 pr-3 text-sm -outline-offset-[12px] overflow-auto outline-0 outline-dashed ${isOver ? 'outline-2' : ''}`}
    ref={drop}>
      {listType === 'card' && <CardList
        tipStatus={tipStatus}
        files={files}
        onClickFold={onClickFold}
        onDelete={onDelete}
      />}
      {listType === 'list' && <TableList
        tipStatus={tipStatus}
        files={files}
        onClickFold={onClickFold}
        onDelete={onDelete}
      />}
  </div>
};

export default FileListContainer;

