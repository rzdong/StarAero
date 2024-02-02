import React from 'react';

import foldSvg from '@/assets/filetype/wenjianjia.svg?raw';
const Fold = ({ file, onDoubleClick }: any) => {
  return <div className='text-primary/80 flex flex-col items-center svg-wrapper select-none' onDoubleClick={onDoubleClick}>
  <span className='w-[120px] h-[120px] flex' dangerouslySetInnerHTML={{__html: foldSvg}}></span>
  <span className='text-base-content'>{file.name}</span>
</div>
};

export default Fold;
