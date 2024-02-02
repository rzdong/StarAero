import React, { useState } from 'react';
import themes from 'daisyui/src/theming/themes';
export const themesArr = Object.keys(themes);


const Themes = () => {
  const htmlTheme = document.documentElement.getAttribute('data-theme');
  const [currTheme, setTheme] = useState(htmlTheme);
  const changeThemeHandle = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };

  return <div className='w-full flex flex-col'>
    <div className='border-0 border-b border-solid border-base-200 sticky top-0 p-6 z-[2] app-region bg-base-100'>
      <h3 className='h-8 leading-8 select-none'>系统主题</h3>
    </div>
    <div className='flex flex-1 w-full overflow-auto px-3'>
      <div className='flex-1 w-full overflow-auto custom-scrollbar'>
        <div className='card flex flex-row flex-wrap gap-4 p-6 items-center justify-center'>
          {themesArr.map(theme => <a
            onClick={() => changeThemeHandle(theme)}
            data-theme={theme} key={theme} className={`rounded-box shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 w-[140px] outline-[6px] outline ${currTheme === theme ? 'outline-primary shadow-primary shadow-lg scale-105' : 'outline-none scale-95'}`}>
            <div className="grid grid-cols-5 grid-rows-3 min-h-[120px] text-xs">
              <div className="bg-base-200/60 col-start-1 row-span-2 row-start-1"></div>
              <div className="bg-base-300/60 col-start-1 row-start-3 col-span-1"></div>
              <div className="bg-base-100/60 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-4 p-2">
                <div className="font-bold">{theme}</div>
                <div className="grid grid-cols-4 grid-rows-1 gap-1 text-center text-xs">
                  <div className="bg-primary flex w-5 aspect-square px-1 items-center justify-center rounded-box">
                    <div className="text-primary-content text-sm font-bold">A</div>
                  </div>
                  <div className="bg-secondary flex w-5 aspect-square px-1 items-center justify-center rounded-box">
                    <div className="text-secondary-content text-sm font-bold">A</div>
                  </div>
                  <div className="bg-accent flex w-5 aspect-square px-1 items-center justify-center rounded-box">
                    <div className="text-accent-content text-sm font-bold">A</div>
                  </div>
                  <div className="bg-neutral flex w-5 aspect-square px-1 items-center justify-center rounded-box">
                    <div className="text-neutral-content text-sm font-bold">A</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 grid-rows-1 gap-1 text-center text-xs">
                  <div className="bg-info flex w-5 aspect-square px-1 items-center justify-center rounded-box">
                    <div className="text-info-content text-sm font-bold">B</div>
                  </div>
                  <div className="bg-success flex w-5 aspect-square px-1 items-center justify-center rounded-box">
                    <div className="text-success-content text-sm font-bold">B</div>
                  </div>
                  <div className="bg-warning flex w-5 aspect-square px-1 items-center justify-center rounded-box">
                    <div className="text-warning-content text-sm font-bold">B</div>
                  </div>
                  <div className="bg-error flex w-5 aspect-square px-1 items-center justify-center rounded-box">
                    <div className="text-error-content text-sm font-bold">B</div>
                  </div>
                </div>
              </div>
            </div>
          </a>)}
        </div>
      </div>
    </div>
  </div>
};

export default Themes;
