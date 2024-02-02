import React from 'react';
import { formatFileSize } from '@/utils/Tool';
import { renderCardIcon } from '../fileList/Tools';
import optionsSvg from '@/assets/icon/options.svg?raw';
import { DeleteStatus } from '@/store/reducerSlice/object';

const FileObject = ({ file, onDelete }: any) => {

  return <div className='card shadow shadow-primary/15 bg-base-200/60'>
  <figure className="w-full h-[90px]">
    {renderCardIcon(file)}
  </figure>
  <div className="card-body p-2 gap-0 border-t border-primary/10">
    <p className='truncate'>{file.name}</p>
    <p className='text-xs'>{formatFileSize(file.size, file.type === 'file')}</p>
  </div>
  <div className='absolute right-1 top-1'>
    <div className="dropdown dropdown-bottom dropdown-end">
    <button tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle" dangerouslySetInnerHTML={{__html: optionsSvg}}></button>
      <ul tabIndex={0} className="dropdown-content bg-base-200 z-10 menu p-2 shadow shadow-primary/15 rounded-box w-24">
        <li>
          <a onClick={() =>{
            if (file.status !== DeleteStatus.loading) {
              onDelete(file);
            }
          }}>
            {file.status === DeleteStatus.loading
              ? <span className="loading loading-spinner text-primary loading-sm"></span>
              : '删除'}
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
};

export default FileObject;
