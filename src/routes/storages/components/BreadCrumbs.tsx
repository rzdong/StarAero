import React from 'react';

const svgIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>;

const BreadCrumbs = ({
  breadcrumbs = [],
  setBreadcrumbs,
}: {
  breadcrumbs: string[],
  setBreadcrumbs: (paths: string[]) => void,
}) => {
  
  const clickHandle = (index: number) => {
    const paths = [...breadcrumbs].slice(0, index + 1);
    setBreadcrumbs(paths);
  };

  return <div className="text-sm breadcrumbs">
  <ul>
    <li key='home' onClick={() => setBreadcrumbs([])}>
      <button className='btn btn-ghost btn-xs'>
        <svg className="w-5 h-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7781" width="16" height="16"><path d="M627.2 640m-230.4 0a230.4 230.4 0 1 0 460.8 0 230.4 230.4 0 1 0-460.8 0Z" fill="#F9EF00" p-id="7782"></path><path d="M827.733333 341.333333l-264.533333-230.4c-34.133333-29.866667-81.066667-29.866667-115.2 0L192 341.333333c-42.666667 38.4-64 89.6-64 145.066667v251.733333c0 93.866667 76.8 166.4 166.4 166.4H725.333333c93.866667 0 166.4-76.8 166.4-166.4v-251.733333c0-55.466667-21.333333-106.666667-64-145.066667z m-247.466666 490.666667h-140.8v-145.066667c0-25.6 21.333333-42.666667 42.666666-42.666666h55.466667c25.6 0 42.666667 21.333333 42.666667 42.666666v145.066667z m234.666666-93.866667c0 51.2-42.666667 89.6-89.6 89.6h-64V682.666667c0-68.266667-55.466667-119.466667-119.466666-119.466667h-55.466667c-68.266667 0-119.466667 55.466667-119.466667 119.466667v145.066666H294.4c-51.2 0-89.6-42.666667-89.6-89.6v-251.733333c0-34.133333 12.8-64 38.4-85.333333l256-230.4s4.266667-4.266667 8.533333-4.266667 0 4.266667 4.266667 4.266667l264.533333 230.4c25.6 21.333333 38.4 55.466667 38.4 89.6v247.466666z" p-id="7783"></path></svg>
      </button>
    </li>
    {breadcrumbs.map((breadcrumb, index) => {
      if (breadcrumbs.length === index + 1) return <li key={breadcrumb} className='select-none'>
        <div className='gap-2 flex items-center px-2'>
          {svgIcon}
          {breadcrumb}
        </div>
      </li>;
      return <li
        onClick={() => clickHandle(index)}
        key={breadcrumb}>
        <button className='btn btn-ghost btn-xs'>
          {svgIcon}
          {breadcrumb}
        </button>
      </li>
    })}
  </ul>
</div>
};

export default BreadCrumbs;
