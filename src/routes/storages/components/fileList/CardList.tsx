import React, { Fragment } from 'react';
import { TipStatus } from '@/hooks/useGetContentByPath';
import FileObject from '../fileobject/FileObject';
import Fold from '../fileobject/Fold';


const CardList = ({ tipStatus, files, onClickFold, onDelete }: any) => {
  return <Fragment>
    {tipStatus === TipStatus.error && <div className="flex justify-center leading-10 text-base-content">
      出错
    </div>}
    {tipStatus === TipStatus.empty && <div className="flex justify-center leading-10 text-base-content">
      暂无数据
    </div>}
    {tipStatus === TipStatus.loading && <div className="flex justify-center leading-10 text-base-content pb-4">
      <span className="loading loading-infinity text-primary loading-md"></span>
    </div>}
    {<div className='relative w-full flex-1 overflow-y-auto custom-scrollbar'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 relative'>
        {files.map((file: any) => <a key={file.name} className="relative transition-transform hover:-translate-y-1 hover:cursor-pointer">
            {file.type === "dir" && <Fold file={file} onDoubleClick={() => onClickFold(file.name)} />}
            {file.type === "file" && <FileObject file={file} onDelete={onDelete} />}
          </a>
        )}
      </div>
    </div>}
  </Fragment>
};

export default CardList;
