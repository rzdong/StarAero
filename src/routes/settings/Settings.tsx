import { GetUserInfo, updateToken } from '@/store/reducerSlice/setting';
import { useAppDispatch, useAppSelector } from '@/store/store';
import React, { useEffect, useState } from 'react';

const Settings = () => {

  const { token, loadingUserinfo, userinfo } = useAppSelector(state => state.setting);
  const dispatcher = useAppDispatch();


  const changeGithubToken = (v: string) => {
    // if (loadingUserinfo) return;
    dispatcher(GetUserInfo(v));
  }

  useEffect(() => {
    token && changeGithubToken(token);
  }, [token])

  return <div className='w-full flex flex-col'>
    <div className="border-0 border-b border-solid border-base-200 sticky top-0 p-6 z-[2] app-region">
      <h3 className='h-8 leading-8 select-none'>设置</h3>
    </div>
    <div className='p-6 flex-1 pt-16'>
      <div className='flex items-start justify-center gap-8 mb-5 last:mb-0'>
        <div className='title w-1/4 text-right text-sm leading-8'>Github Token</div>
        <div className='w-2/4'>
          <div className='w-full'>
            <input
              // type="password"
              placeholder="token"
              value={token || ''}
              onChange={(e) => {
                changeGithubToken(e.target.value);
              }}
              className="input input-sm input-primary w-full" />
            {token && <div className='w-full flex items-center mt-2 h-8'>
              {loadingUserinfo === 'success' && <div className='flex gap-2 items-center'>
                <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={userinfo.avatar_url} />
                </div>
              </div>
                <div className='text-sm text-base-content'>
                  {userinfo.login}
                </div></div>}

              {loadingUserinfo === 'loading' && <div className='flex items-center py-4 px-[11px]'>
                <span className="loading loading-spinner loading-xs"></span>
              </div>}
              {loadingUserinfo === 'error' && <button className="btn btn-xs btn-outline btn-error" onClick={() => {
                changeGithubToken(token!)
              }}>重试</button>}
            </div>}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-8 mb-5 last:mb-0'>
        <div className='title w-1/4 text-right text-sm'>上传确认</div>
        <div className='form-control w-2/4'>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </div>
      <div className='flex items-center justify-center gap-8 mb-5 last:mb-0'>
        <div className='title w-1/4 text-right text-sm'>缩略图显示源文件</div>
        <div className='form-control w-2/4'>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </div>
      <div className='flex items-center justify-center gap-8 mb-5 last:mb-0'>
        <div className='title w-1/4 text-right text-sm'>删除前确认</div>
        <div className='form-control w-2/4'>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </div>
      {/* <div className='flex items-center justify-center gap-8'>
        <div className='title w-[100px] text-right text-sm'>语言</div>
        <div className='form-control w-[450px]'>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </div> */}
    </div>
  </div>
};

export default Settings;
