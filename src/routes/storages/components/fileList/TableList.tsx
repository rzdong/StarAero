import { TipStatus } from '@/hooks/useGetContentByPath';
import { DeleteStatus } from '@/store/reducerSlice/object';
import { formatFileSize } from '@/utils/Tool';
import React from 'react';
import { renderIcon } from './Tools';

const TableList = ({ tipStatus, files, onClickFold, onDelete }: any) => {
  
  return <div className='overflow-y-auto w-full h-full custom-scrollbar'>
    <div>
    <table className="table table-pin-rows">
      <thead>
        <tr>
          <th>文件名</th>
          <th>大小</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {[TipStatus.error, TipStatus.empty, TipStatus.loading].includes(tipStatus) && <tr><td colSpan={3}>
          {tipStatus === TipStatus.error && <div className="flex justify-center leading-10 text-base-content">
            出错
          </div>}
          {tipStatus === TipStatus.empty && <div className="flex justify-center leading-10 text-base-content">
            暂无数据
          </div>}
          {tipStatus === TipStatus.loading && <div className="flex justify-center leading-10 text-base-content">
            <span className="loading loading-infinity text-primary loading-md"></span>
          </div>}
        </td></tr>}
      </tbody>
      <tbody>
        {files.map((file: any) => <tr
          key={file.name}
          onDoubleClick={file.type === 'dir' ? () => onClickFold(file.name) : undefined}
          className='hover cursor-pointer select-none'>
          <td>
            <div className='flex gap-2'>
              <div>
                {renderIcon(file)}
              </div>
              {file.name}
            </div>
          </td>
          <td className='w-40'>{formatFileSize(file.size, file.type === 'file')}</td>
          <td className='w-20'>
            <div className='flex min-h-6'>
              {file.type === 'file' && <button
                className={`btn btn-outline btn-primary min-w-[42px] btn-xs ${file.status === DeleteStatus.loading ? 'btn-disabled' : ''}`}
                onClick={() => onDelete(file)}
              >
                {file.status === DeleteStatus.loading
                  ? <span className="loading loading-spinner loading-xs"></span>
                  : '删除'}
              </button>}
            </div>
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
</div>
};

export default TableList;
