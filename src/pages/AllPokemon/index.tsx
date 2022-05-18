import React, {useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Table, SpinLoader } from 'components';
import { addPokemon, getPokemonData } from 'actions/AppAction';
import { getAllPokemonDataSelector, getLoading } from 'seletors/AppSelector';
import { Container } from './styles';

message.config({ maxCount: 1 });

const AllPokemon = () => {
  const dispatch = useDispatch();
  const allPokemonList = useSelector(getAllPokemonDataSelector);
  const loading = useSelector(getLoading);

  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getPokemonData(0, 20));
  }, []);

  const displayRecord: any = useMemo(() => {
    if(searchName === '') return allPokemonList?.results;
    if(searchName?.length) {
     return (allPokemonList?.results || [])?.filter((d: any) => (d?.name).toLowerCase().includes(searchName.toLowerCase())) || [];
    }
  }, [searchName]);

  const onAddPokemon = (record) => () => {
    const username = localStorage.getItem('user') || '';
    // @ts-ignore
    const res = dispatch(addPokemon({...record, username }));
    if(res) {
      message.success('Pokemon added successfully in your bag..!');
    }
  };

  const onSearch = (e) => {
    const { value } = e.target;
    setSearchName(value);
  };

  const getPageRecords = (page, pageSize) => {
    // @ts-ignore
    dispatch(getPokemonData(((page -1) * pageSize), pageSize));
  };

  const column = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: 100
    },
    {
      key: 'url',
      title: 'URL',
      dataIndex: 'url',
      width: 100
    },
    {
      key: 'Operation',
      title: 'Operation',
      width: 100,
      render: (record) => {
        return (
          <Button type="primary" onClick={onAddPokemon(record)}>Add Pokemon</Button>
        )
      }
    },
  ]

  return(
    <Container>
      { loading && <SpinLoader /> }
      <div>
        <Input prefix={<SearchOutlined />} onChange={onSearch} placeholder="Search by Name.." />
      </div>
      <Table
        dataSource={displayRecord}
        columns={column}
        getPaginationRecord={getPageRecords}
        total={searchName?.length ? displayRecord.length : allPokemonList?.count}
      />
    </Container>
  );
}

export default AllPokemon;