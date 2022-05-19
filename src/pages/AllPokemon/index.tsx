import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Table, SpinLoader } from 'components';
import { addPokemon, getPokemonData } from 'actions/AppAction';
import { getAllPokemonDataSelector, getLoading, getMyPokemonSelector } from 'seletors/AppSelector';
import { Container } from './styles';

message.config({ maxCount: 1 });

const AllPokemon = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem('user') || '';
  const allPokemonList = useSelector(getAllPokemonDataSelector);
  const myPokemonList = useSelector(getMyPokemonSelector(username));
  const loading = useSelector(getLoading);

  const [list, setList] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getPokemonData(0, 10000));
  }, [dispatch]);

  useEffect(() => {
    setList(allPokemonList?.results);
  }, [allPokemonList]);

  const onAddPokemon = (record) => async () => {
    const index = (myPokemonList || []).findIndex(i => i.name === record.name && i.url === record.url);
    if(index !== -1) {
      message.warn('This pokemon is already in your bag');
      return;
    }
    // @ts-ignore
    dispatch(addPokemon({ ...record, username }, (res: boolean) => {
      if(res) {
        message.success('Pokemon added successfully in your bag..!');
      }
    }));
  };

  const onSearch = (e) => {
    const text = e.target.value;
    setSearchName(text);
    if (text) {
      const result = (allPokemonList?.results || [])?.filter((d: any) => (d?.name).toLowerCase().includes(text.toLowerCase())) || [];
      setList(result);
    } else {
      setList(allPokemonList?.results);
    }
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
        dataSource={list}
        columns={column}
        total={searchName?.length ? list.length : allPokemonList?.count}
      />
    </Container>
  );
}

export default AllPokemon;