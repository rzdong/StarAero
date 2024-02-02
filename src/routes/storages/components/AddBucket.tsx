
import React, { memo, useEffect, useRef } from 'react';
import plusSvg from '@/assets/icon/plus.svg?raw';
import { Controller, useForm } from 'react-hook-form';
import useCreateBucket from '@/hooks/useCreateBucket';
import { BUCKET_PREFIX } from '@/configs/const';
import { useAppDispatch } from '@/store/store';
import { CreateBuckets, GetBuckets } from '@/store/reducerSlice/bucket';

const AddBucket = memo(() => {

  const ref = useRef<any>();
  const { loading, createBucket } = useCreateBucket();
  const dispatcher = useAppDispatch();
  const { handleSubmit, formState: { errors }, formState, reset, register, setValue, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      desc: '',
      private: 'private',
    }
  });

  const onCreateBucket = async (value: any) => {
    const originName = `${BUCKET_PREFIX}_${value.name}`;
    
    dispatcher(CreateBuckets({
      name: originName,
      description: value.desc,
      isPrivate: value.private === 'private',
    })).then((res) => {
      console.log(res);
      dispatcher(GetBuckets());
      close();
    })

    
  }

  const open = () => {
    ref.current.showModal()
  };

  const close = () => {
    reset();
    ref.current.close();
  }

  return <div className='reset-app-region'>
    <button onClick={open} className="btn btn-sm btn-circle btn-primary">
      <span dangerouslySetInnerHTML={{ __html: plusSvg }}></span>
    </button>
    <dialog ref={ref} id="my_modal_1" className="modal drop-shadow-lg backdrop-blur-md">
      <div className="modal-box w-[500px] shadow-md rounded-md shadow-base-content/30">
        <h3 className="font-bold text-lg">创建存储库</h3>
        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={close}>✕</button></form>
        <form className="modal-backdrop py-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text">存储库名称</span>
              <input
                {...register('desc', {
                  required: 'true',
                  maxLength: {value: 6, message: '不超过6个字符'}
                })}
                className={`input input-sm input-bordered input-primary w-full max-w-xs ${errors.desc?.message ? 'input-error' : ''}`} placeholder="不超过六个文字"></input>
            </div>
          </label>
          
          <label className="form-control">
            <div className="label">
              <span className="label-text">存储库</span>
              <input
                {...register('name', {
                  required: 'true',
                  pattern: { value: /[a-zA-Z0-9]/ig, message: '只能是字母数字'}
                })}
                className={`input input-sm input-bordered input-primary w-full max-w-xs ${errors.name?.message ? 'input-error' : ''}`} placeholder="填写字母和数字的组合"></input>
            </div>
          </label>
          <div className="form-control">
            <div className="label items-start">
              <span className="label-text h-8 leading-8">存储库权限</span>
              <div className='w-full max-w-xs flex flex-col items-start'>
                <div className='flex items-center h-8'>
                  <label className='flex items-center cursor-pointer'>
                    <span className="label-text text-sm mr-2">私有</span>
                    <input
                      {...register('private', {required: true})}
                      type="radio" value="private" className={`radio radio-sm radio-primary ${errors.private?.message ? 'radio-error' : ''}`} />
                  </label>
                  <label className='flex items-center ml-5 cursor-pointer'>
                    <span className="label-text text-sm mr-2">公有</span> 
                    <input
                      {...register('private', {required: true})}
                      type="radio" value="public" className={`radio radio-sm radio-primary ${errors.private?.message ? 'radio-error' : ''}`} />
                  </label>
                </div>
                <div className='text-base-content/40 text-[12px] mt-1'>私有只有自己可见，公有任何人可见</div>
              </div>
            </div>
          </div>
        </form>
        <div className="modal-action">
          <button className="btn btn-primary btn-sm" disabled={loading} onClick={handleSubmit(onCreateBucket)}>
            {loading && <span className="loading loading-spinner"></span>}
            创建
          </button>
          <button className='btn btn-sm' onClick={close}>取消</button>
        </div>
      </div>
    </dialog>
  </div>
});

export default AddBucket;
