import { useAppDispatch, useAppSelector } from '@/store/store';
import React from 'react';
import listSvg from '@/assets/icon/list.svg?raw';
import dashboardSvg from '@/assets/icon/dashboard.svg?raw';
import { updateListType } from '@/store/reducerSlice/bucket';

const ListType = () => {
  const { listType } = useAppSelector(state => state.bucket);
  const dispatcher = useAppDispatch();

  const clickHandle = (type: 'card' | 'list') => {
    dispatcher(updateListType(type));
  }

  return <div className="join">
    <button
      className={`btn btn-sm join-item svg-icon  ${listType === 'card' ? 'btn-primary' : ''}`}
      dangerouslySetInnerHTML={{__html: dashboardSvg}}
      onClick={() => clickHandle('card')}></button>
    <button
      className={`btn btn-sm join-item svg-icon ${listType === 'list' ? 'btn-primary' : ''}`}
      dangerouslySetInnerHTML={{__html: listSvg}}
      onClick={() => clickHandle('list')}></button>
  </div>
};

export default ListType;
