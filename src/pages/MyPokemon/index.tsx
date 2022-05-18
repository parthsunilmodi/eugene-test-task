import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, message, Select } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, SpinLoader } from 'components';
import { getLoading, getMyPokemonSelector, getPokemonTypeSelector } from 'seletors/AppSelector';
import { getPokemonTypeData, getPokemonTypes, deletePokemon } from 'actions/AppAction';
import { Container, DeleteIcon, FilterWrap } from './styles';

const { Option } = Select;
message.config({ maxCount: 1 });

const MyPokemon = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user') || '';

  const myPokemon = useSelector(getMyPokemonSelector(user));
  const pokemonTypeList = useSelector(getPokemonTypeSelector);
  const loading = useSelector(getLoading);

  const [list, setList] = useState(myPokemon);
  const [typeList, setTypeList] = useState([]);
  const [typeListResult, setTypeListResult] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    if(!pokemonTypeList?.length) {
      // @ts-ignore
      dispatch(getPokemonTypes());
    }
  }, []);

  const onDeleteRecord = (record) => async () => {
    // @ts-ignore
    const res = await dispatch(deletePokemon(record));
    if(res) {
      const index = (list || []).findIndex(i => i.name === record.name && i.url === record.url);
      setList([
        ...list.slice(0, index),
        ...list.slice(index+1)
      ]);
      message.success("Pokemon removed from your bag successfully..!");
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
          <DeleteIcon onClick={onDeleteRecord(record)} ><DeleteOutlined /></DeleteIcon>
        )
      }
    },
  ]

  const onSearch = (e) => {
    const { value } = e.target;
    const list = typeList?.length !== 0 ? typeListResult : myPokemon;
    setSearchName(value);
    if (value) {
      const result = (list || [])?.filter((d: any) => (d?.name).toLowerCase().includes(value.toLowerCase())) || [];
      setList(result);
    } else {
      setList(list);
    }
  };

  const searchByType = async (value) => {
    return Promise.allSettled(
      (value || []).map(e => {
        // @ts-ignore
        return dispatch(getPokemonTypeData(e));
      })
    ).then((responseArr: any) => {
      const status: any = [];
      const response: any = [];
      responseArr.forEach((res: any) => {
        status.push(res?.status);
        response.push(res?.value?.data);
      });
      if (!status.includes('rejected')) {
        let typeArr: any = [];
        (response || []).forEach((i: any) => {
          const pokemonArr = (i?.pokemon || []).map(p => p.pokemon);
          typeArr = [...typeArr, ...pokemonArr]
        });
        const filterResult = (typeArr || []).filter(o => list.some(({name}) => o.name === name));
        setTypeListResult(filterResult);
        return filterResult;
      }
    });
  };

  const handleChange = async (value) => {
    if(value?.length === 0 && searchName === '') {
      setTypeList(value);
      setList(myPokemon);
    } else if(value?.length === 0 && searchName !== '') {
      const result = (myPokemon || [])?.filter((d: any) => (d?.name).toLowerCase().includes(searchName.toLowerCase())) || [];
      setList(result);
      setTypeList(value);
    } else {
      setTypeList(value);
      const result = await searchByType(value);
      setList(result);
    }
  }

  return(
    <Container>
      { loading && <SpinLoader /> }
      <FilterWrap>
        <Input prefix={<SearchOutlined />} onChange={onSearch} placeholder="Search by Name.." />
        <Select
          mode="multiple"
          placeholder="Please select type of pokemon"
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {
            (pokemonTypeList || []).map((i: { name: string, url: 'string' }) => (<Option key={i?.name}>{i?.name}</Option>))
          }
        </Select>
      </FilterWrap>
      <Table
        dataSource={list}
        columns={column}
        total={list?.length}
      />
    </Container>
  );
}

export default MyPokemon;