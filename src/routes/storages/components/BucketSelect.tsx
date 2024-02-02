import { SelectOptions } from '@/hooks/useGetBuckets';
import { updateSelected } from '@/store/reducerSlice/bucket';
import { useAppDispatch, useAppSelector } from '@/store/store';
import React, { memo, useEffect, useMemo, useRef } from 'react';

interface BucketSelectProps {
  options: SelectOptions[];
  value: string;
  onChange: (value: string) => void;
}

const BucketSelect = memo(() => {
  const { buckets, currentBucket } = useAppSelector(state => state.bucket)
  const dispatcher = useAppDispatch();
  const detailRef = useRef<any>(null);

  const bodyClick = () => {
    setTimeout(() => {
      detailRef.current.removeAttribute('open');
      document.removeEventListener('click', bodyClick);
    }, 10);
  }


  const clickHandle = (value: string) => {
    
    dispatcher(updateSelected(value));
    document.addEventListener('click', bodyClick);
  };

  return <details className="dropdown dropdown-bottom min-w-[120px] mr-5 reset-app-region" ref={detailRef}>
  <summary className='btn btn-sm btn-outline btn-primary btn-block justify-between'>
    {(!!buckets.length && currentBucket) ? <span className='font-normal'>{currentBucket.description}</span> : '选择存储库'}
    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
  </summary>
  {!!buckets.length && <ul className="dropdown-content z-[1] menu p-2 text-xs shadow-lg rounded-box w-44 bg-base-100">
    {buckets.map(v => <li key={v.name} className='mt-1' onClick={() => {
      clickHandle(v.name);
    }}>
      <a className={v.name === currentBucket?.name ? 'active py-2' : 'py-2'}>
        {v.description}
        {v.private && <div className="badge badge-neutral badge-sm">私有</div>}
        {!v.private && <div className="badge badge-sm">公有</div>}
      </a>
    </li>)}
  </ul>}
</details>
});

export default BucketSelect;
