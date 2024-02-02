import About from '@/routes/about/About';
import Settings from '@/routes/settings/Settings';
import Storages from '@/routes/storages/Storages';
import Themes from '@/routes/themes/Themes';
import Transports from '@/routes/transports/Transports';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const ContentLayout = () => {

  return <div className='flex-1 overflow-y-auto overflow-hidden flex'>
    <Routes>
      <Route path="/storages" element={<Storages />} />
      <Route path="/transports" element={<Transports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/themes" element={<Themes />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Navigate replace to="/storages" />} />
    </Routes>
</div>
};

export default ContentLayout;
