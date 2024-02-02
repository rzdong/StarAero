import React, { memo, useCallback, useEffect, useState } from 'react';
import './menu.less';

import dashboardsvg from '@/assets/icon/dashboard-color.svg?raw';
import settingsvg from '@/assets/icon/setting.svg?raw';
import transportsvg from '@/assets/icon/transport.svg?raw';
import keysvg from '@/assets/icon/key.svg?raw';
import themesvg from '@/assets/icon/theme.svg?raw';
import aboutsvg from '@/assets/icon/about.svg?raw';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TaskManager from '@/utils/TaskManager';
import { TaskStatus } from '@/utils/Task';

const menu = [
  {
    label: '我的存储库',
    icon: dashboardsvg,
    link: '/storages'
  },
  {
    label: '传输列表',
    icon: transportsvg,
    link: '/transports',
    isBadge: true,
  },
  // {
  //   label: 'Github密钥',
  //   icon: keysvg,
  //   link: '/key'
  // },
  {
    label: '设置',
    icon: settingsvg,
    link: '/settings'
  },
]

// const menu2 = [
// ]

const menu3 = [
  {
    label: '主题',
    icon: themesvg,
    link: '/themes'
  },
  // {
  //   label: '关于',
  //   icon: aboutsvg,
  //   link: '/about'
  // },
]



const MenuLayout = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  return <div className='w-[200px] border-0 menu-layout border-r border-solid border-base-200'>
  <div className='flex flex-col justify-between w-full h-full'>
<div>
<div className="flex p-6 justify-center">
      <button className='btn btn-ghost w-full justify-start px-3 py-2 h-auto' onClick={() => navigate(menu[0].link)}>
        <svg className="w-[50px] h-[50px]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8871" width="200" height="200"><path d="M522.496 583.936m-227.6864 0a227.6864 227.6864 0 1 0 455.3728 0 227.6864 227.6864 0 1 0-455.3728 0Z" fill="#EDC951" p-id="8872"></path><path d="M508.1088 829.2352c-145.8176 0-264.4992-118.6304-264.4992-264.4992 0-145.8176 118.6304-264.4992 264.4992-264.4992 145.8176 0 264.4992 118.6304 264.4992 264.4992 0 145.8688-118.6304 264.4992-264.4992 264.4992z m0-498.2272c-128.9216 0-233.7792 104.8576-233.7792 233.7792 0 128.9216 104.8576 233.7792 233.7792 233.7792 128.8704 0 233.7792-104.8576 233.7792-233.7792 0-128.9216-104.8576-233.7792-233.7792-233.7792z" fill="#333333" p-id="8873"></path><path d="M751.2576 495.4624c6.912 19.456 11.2128 40.0896 12.288 61.5424 45.8752 40.8576 67.84 81.8176 54.8352 112.9472-25.5488 61.0816-191.5904 89.4976-351.8976 28.2112C306.176 636.8768 186.5728 499.3536 212.1216 438.272c13.312-31.8976 58.4704-51.7632 123.5456-50.3296 16.0768-14.3872 23.2448-17.7664 43.008-27.4944-111.6672-8.9088-202.24 0.3584-226.816 59.136-34.3552 82.1248 80.5376 234.5472 286.6176 313.344 206.08 78.7456 425.3696 54.016 459.6736-28.1088 24.064-57.5488-37.1712-138.8032-146.8928-209.3568z" fill="#FFA750" p-id="8874"></path><path d="M697.3952 808.0384c-83.6096 0-181.3504-18.2784-275.6096-55.9104-103.7312-41.472-194.6624-102.0928-255.8976-170.752-60.672-67.9424-84.0192-135.5264-64.0512-185.3952 27.9552-69.9904 141.2096-96.0512 295.5264-67.9936 6.4512 1.1776 11.4688 6.3488 12.4416 12.8512 0.9728 6.5024-2.304 12.9024-8.192 15.9232-19.5584 10.0352-37.4784 22.5792-53.1456 37.2736-2.9184 2.7648-6.7584 4.2496-10.8544 4.1472-62.6688-1.4848-106.496 13.6192-117.1968 40.3456-10.3424 25.856 8.6016 66.1504 50.688 107.776 47.2064 46.7456 116.48 89.7536 195.072 121.1904 78.4896 31.3856 158.0032 47.872 223.8976 46.336 58.5728-1.3312 99.7376-17.6128 110.1312-43.52 10.5472-26.3168-9.0112-65.28-53.6576-106.8544-2.9184-2.7136-4.6592-6.5024-4.864-10.496-1.0752-21.4528-5.12-42.752-12.0832-63.2832a15.3856 15.3856 0 1 1 23.1424-17.7152c125.696 84.6336 186.88 179.6096 159.5392 247.8592-23.296 58.0096-107.4176 88.2176-214.8864 88.2176zM282.4192 347.4432c-80.3328 0-136.5504 20.992-152.064 59.904-15.2064 38.0928 6.6048 95.488 58.4192 153.5488 58.1632 65.1776 144.9472 122.9312 244.3776 162.6624 98.7648 39.4752 206.6944 58.88 295.9872 53.1968 81.664-5.1712 139.4176-30.72 154.4704-68.3008 19.0464-47.616-25.4464-118.8352-114.5856-186.9312 1.28 7.8336 2.2528 15.7184 2.816 23.6544 51.9168 49.92 72.0384 98.2528 56.7808 136.448-15.5136 38.8096-64.512 61.1328-137.9328 62.8224-69.888 1.536-153.7536-15.616-235.9808-48.4864-82.3296-32.9216-155.2384-78.336-205.2608-127.8464C196.8128 515.9936 176.3328 465.92 191.8464 427.1104c15.6672-39.2192 65.1776-60.416 140.2368-59.7504 6.0928-5.4272 12.4416-10.5472 19.0464-15.4112-24.3712-3.0208-47.4112-4.5056-68.7104-4.5056z" fill="#333333" p-id="8875"></path><path d="M407.296 146.8928l57.9584-48.4864-8.704 76.9536 38.0416 57.4976-66.7136-17.4592-50.5344 36.864 14.9504-58.8288-45.5168-56.8832z" fill="#FFA750" p-id="8876"></path><path d="M339.3024 296.8064c-3.072 0-6.144-0.9216-8.7552-2.7648a15.34464 15.34464 0 0 1-6.0928-16.5376l21.504-81.5616-66.5088-80.1792c-4.096-4.9152-4.7104-11.8784-1.4848-17.4592a15.3344 15.3344 0 0 1 15.8208-7.5264l88.32 14.592L467.9168 36.1472c4.864-3.9424 11.6224-4.5056 17.0496-1.4848 5.4784 3.0208 8.5504 9.0624 7.8336 15.2576L479.744 160.8192l56.5248 82.4832a15.33952 15.33952 0 0 1-16.4352 23.552L421.8368 242.176 348.16 293.9904c-2.6624 1.8944-5.7344 2.816-8.8576 2.816z m-9.9328-169.0112l45.312 54.6304c3.1744 3.84 4.3008 8.9088 3.0208 13.7216l-12.8 48.5376 45.0048-31.6416c3.6352-2.56 8.2432-3.4304 12.5952-2.3552l65.4848 16.5376-36.8128-53.76c-2.0992-3.072-3.0208-6.8096-2.56-10.496l9.3184-79.3088-61.9008 49.92c-3.4304 2.7648-7.8336 3.8912-12.1344 3.1744l-54.528-8.96z" fill="#333333" p-id="8877"></path><path d="M879.616 361.984l28.3136-23.6544-4.2496 37.5296 18.5856 28.1088-32.6144-8.4992-24.6272 17.9712 7.2704-28.7232-22.2208-27.8016z" fill="#FFA750" p-id="8878"></path><path d="M831.6416 445.952c-3.072 0-6.144-0.9216-8.7552-2.7648a15.34464 15.34464 0 0 1-6.0928-16.5376l11.3664-43.1104-35.6352-43.008c-4.096-4.9152-4.7104-11.8784-1.4848-17.4592s9.472-8.5504 15.8208-7.5264l47.3088 7.7824 46.4896-37.4784c4.864-3.9424 11.6224-4.5056 17.0496-1.4848s8.5504 9.0624 7.8336 15.2576l-7.1168 60.6208 30.7712 44.9024a15.33952 15.33952 0 0 1-16.4352 23.552l-52.8384-13.312-39.424 27.7504c-2.7136 1.8944-5.7856 2.816-8.8576 2.816z m10.752-93.3376l14.4384 17.408c3.1744 3.84 4.3008 8.9088 3.0208 13.7216l-2.6624 10.0352 10.752-7.5776c3.6864-2.56 8.2944-3.4304 12.5952-2.3552l20.2752 5.12-11.0592-16.128c-2.0992-3.072-3.0208-6.8096-2.56-10.496l3.4304-28.9792-22.5792 18.176c-3.4304 2.7648-7.8336 3.8912-12.1344 3.2256l-13.5168-2.1504z" fill="#333333" p-id="8879"></path><path d="M610.9696 901.9904l28.3648-23.7056-4.3008 37.5808 18.5856 28.1088-32.5632-8.5504-24.6784 18.0224 7.3216-28.7744-22.272-27.7504z" fill="#FFA750" p-id="8880"></path><path d="M562.9952 985.9072c-3.072 0-6.144-0.9216-8.7552-2.7648a15.34464 15.34464 0 0 1-6.0928-16.5376l11.3664-43.1104-35.6352-43.008c-4.096-4.9152-4.7104-11.8784-1.4848-17.4592s9.472-8.5504 15.8208-7.5264l47.3088 7.7824 46.4896-37.4784c4.864-3.9424 11.6224-4.5056 17.0496-1.4848 5.4784 3.0208 8.5504 9.0624 7.8336 15.2576l-7.1168 60.6208 30.7712 44.8512a15.33952 15.33952 0 0 1-16.4352 23.552l-52.8384-13.312-39.424 27.7504c-2.6624 1.9456-5.7856 2.8672-8.8576 2.8672z m10.752-93.2864l14.4384 17.408c3.1744 3.84 4.3008 8.9088 3.0208 13.7216l-2.6624 10.0352 10.752-7.5776c3.6352-2.56 8.2432-3.4304 12.5952-2.3552l20.2752 5.12-11.0592-16.128c-2.0992-3.072-3.0208-6.8096-2.56-10.496l3.4304-28.9792-22.5792 18.176c-3.4304 2.7648-7.7824 3.8912-12.1344 3.2256l-13.5168-2.1504z" fill="#333333" p-id="8881"></path></svg>
        <span className=''>StarAero</span>
      </button>
    </div>
    <div className="p-4 ">
      <ul className="menu rounded-box">
      {menu.map(v => <li
          key={v.label}
          className='w-full menu-item mb-3 last:mb-0'>
          <a onClick={() => navigate(v.link)} className={`relative btn h-[50px] leading-[50px] py-0 text-xs flex items-center justify-start ${location.pathname.startsWith(v.link) ? 'active' : ''}`}>
            <span dangerouslySetInnerHTML={{__html: v.icon}}></span>
            {v.label}
            
            {v.isBadge && <UploadCountComponent />}
          </a>
        </li>)}
      </ul>
    </div>
    {/* <div className="p-4">
      <ul className="menu rounded-box">
      {menu2.map(v => <li
          key={v.label}
          className='w-full menu-item mb-3 last:mb-0'>
          <a onClick={() => navigate(v.link)} className={`btn h-[50px] leading-[50px] py-0 text-xs flex items-center justify-start ${location.pathname.startsWith(v.link) ? 'active' : ''}`}>
            <span dangerouslySetInnerHTML={{__html: v.icon}}></span>
            {v.label}
          </a>
        </li>)}
      </ul>
    </div> */}
</div>

    <div className="p-4">
    <ul className="menu rounded-box">
      {menu3.map(v => <li
          key={v.label}
          className='w-full menu-item mb-3 last:mb-0'>
          <a onClick={() => navigate(v.link)} className={`btn btn-paramy h-[50px] leading-[50px] py-0 text-xs flex items-center justify-start ${location.pathname.startsWith(v.link) ? 'active' : ''}`}>
            <span dangerouslySetInnerHTML={{__html: v.icon}}></span>
            {v.label}
          </a>
        </li>)}
      </ul>
    </div>
  </div>

</div>
});

export default MenuLayout;


const UploadCountComponent = memo(() => {
  const [uploadCount, setUploadCount] = useState(0);

  const mergeTaskDateToTransport = useCallback(() => {
    const instance = TaskManager.getInstance();
    const count = instance.tasks.filter(task => task.taskStatus === TaskStatus.uploading).length;
    console.log(count, instance.tasks)
    setUploadCount(count);
  }, []);

  useEffect(() => {
    const instance = TaskManager.getInstance();
    mergeTaskDateToTransport();
    instance.addListener('taskUpdate', mergeTaskDateToTransport);
    return () => {
      instance.removeListener('taskUpdate', mergeTaskDateToTransport);
    }
  }, []);

  return uploadCount === 0
    ? <></>
    : <div
      className="badge text-xs badge-secondary absolute right-[2px] top-[2px]"
    >{uploadCount}</div>
    
})
