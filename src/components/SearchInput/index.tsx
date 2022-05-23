import React, { ChangeEvent } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

interface SearchInputInterface {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput: React.FC<SearchInputInterface> = (props) => {
  const { onSearch } = props;

  return(
    <Input prefix={<SearchOutlined />} onChange={onSearch} placeholder="Search by Name.." />
  );
}

export default SearchInput;