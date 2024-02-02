import React from 'react';

const SearchInput = ({ value, onChange }: any) => {
  return <input
  type="text"
  value={value}
  placeholder="搜索当前目录"
  onChange={(e) => {
    onChange(e.target.value);
  }}
  className="input input-sm input-primary w-full max-w-xs text-xs focus:outline-primary/50 reset-app-region" />
};

export default SearchInput;


