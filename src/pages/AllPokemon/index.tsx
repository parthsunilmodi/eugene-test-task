import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Button, message } from 'antd';
import { Table, SpinLoader, SearchInput } from 'components';
import { Pokemon } from 'model';
import { getAllPokemonDataSelector, getLoading, getMyPokemonSelector } from 'seletors/AppSelector';
import { useActions } from 'actions';
import * as AppActions from 'actions/AppAction';
import { Container } from './styles';

message.config({ maxCount: 1 });

const AllPokemon = () => {
  const username = localStorage.getItem('user') || '';
  const allPokemonList = useSelector(getAllPokemonDataSelector);
  const myPokemonList = useSelector(getMyPokemonSelector(username));
  const loading = useSelector(getLoading);
  const appAction = useActions(AppActions);

  const [list, setList] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    appAction.getPokemonData(0, 20);
  }, []);

  useEffect(() => {
    setList(allPokemonList?.results);
  }, [allPokemonList]);

  const onAddPokemon = (record) => async () => {
    const index = (myPokemonList || []).findIndex(i => i.name === record.name && i.url === record.url);
    if(index !== -1) {
      message.warn('This pokemon is already in your bag');
      return;
    }
    appAction.addPokemon({ ...record, username }, (res: boolean) => {
      if(res) {
        message.success('Pokemon added successfully in your bag..!');
      }
    });
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchName(value);
    if (value) {
      const result = (allPokemonList?.results || [])?.filter((d: Pokemon) => (d?.name).toLowerCase().includes(value.toLowerCase())) || [];
      setList(result);
    } else {
      setList(allPokemonList?.results);
    }
  };

  const getPageRecords = (page: number, pageSize: number) => {
    appAction.getPokemonData(((page - 1) * pageSize), pageSize);
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
      <SearchInput onSearch={onSearch} />
      <Table
        dataSource={list}
        columns={column}
        getPaginationRecord={getPageRecords}
        total={searchName?.length ? list.length : allPokemonList?.count}
      />
    </Container>
  );
}

export default AllPokemon;