import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Table from 'components/AntTable';
import { addPokemon, getPokemonData } from 'actions/AppAction';
import { getAllPokemonDataSelector, getLoading } from 'seletors/AppSelector';
import SpinLoader from 'components/SpinLoader';
import { Container } from './styles';

message.config({ maxCount: 1 });

const AllPokemon = () => {
  const dispatch = useDispatch();
  const allPokemonList = useSelector(getAllPokemonDataSelector);
  const loading = useSelector(getLoading);

  const [list, setList] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getPokemonData(0, 20));
  }, []);

  useEffect(() => {
    setList(allPokemonList?.results);
  }, [allPokemonList]);

  const onAddPokemon = (record) => () => {
    const username = localStorage.getItem("user") || "";
    // @ts-ignore
    dispatch(addPokemon({...record, username }, (res) => {
      if(res) {
        message.success("Pokemon added successfully in your bag..!");
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
        dataSource={list}
        columns={column}
        getPaginationRecord={getPageRecords}
        total={searchName?.length ? list.length : allPokemonList?.count}
      />
    </Container>
  );
}

export default AllPokemon;