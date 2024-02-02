
import React, { memo, useEffect, useRef } from 'react';
import plusSvg from '@/assets/icon/plus.svg?raw';
import { Controller, useForm } from 'react-hook-form';
import useCreateFold from '@/hooks/useCreateFold';
import { BUCKET_PREFIX } from '@/configs/const';

const AddFold = memo(({ onSuccess, owner, repo, breadcrumbs }:  any) => {

  const ref = useRef<any>();
  const { loading, createFold } = useCreateFold();
  const { handleSubmit, formState: { errors }, reset, register } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
    }
  });

  const onCreateFold = async (value: any) => {
    const pathPrefix = breadcrumbs.length === 0 ? '' : `${breadcrumbs.join('/')}/`;
    
    const res = await createFold({
      owner,
      repo,
      path: `${pathPrefix}${value.name}`,
    });
    if (res.status === 201) {
      onSuccess(res.data);
      close();
    }
  }

  const open = () => {
    ref.current.showModal()
  };

  const close = () => {
    reset();
    ref.current.close();
  }

  return <div className='join'>
    <dialog ref={ref} id="my_modal_2" className="modal drop-shadow-lg backdrop-blur-md">
      <div className="modal-box w-[500px] shadow-md rounded-md shadow-base-content/30">
        <h3 className="font-bold text-lg">创建文件夹</h3>
        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={close}>✕</button></form>
        <form className="modal-backdrop py-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text">文件夹名称</span>
              <input
                {...register('name', {
                  required: 'true',
                  maxLength: {value: 10, message: '不超过10个字符'}
                })}
                className={`input input-sm input-bordered input-primary w-full max-w-xs ${errors.name?.message ? 'input-error' : ''}`} placeholder="不超过10个字符"></input>
            </div>
          </label>
        </form>
        <div className="modal-action">
          <button className="btn btn-primary btn-sm" disabled={loading} onClick={handleSubmit(onCreateFold)}>
            {loading && <span className="loading loading-spinner"></span>}
            创建
          </button>
          <button className='btn btn-sm' onClick={close}>取消</button>
        </div>
      </div>
    </dialog>
    <button onClick={open} className="btn btn-sm join-item">
      新建目录
    </button>
  </div>
});

export default AddFold;
