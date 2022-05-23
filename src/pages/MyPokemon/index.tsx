import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { message, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Table, SpinLoader, SearchInput } from 'components';
import { Pokemon } from 'model';
import { getLoading, getMyPokemonSelector, getPokemonTypeSelector } from 'seletors/AppSelector';
import { useActions } from 'actions';
import * as AppActions from 'actions/AppAction';
import { Container, DeleteIcon, FilterWrap } from './styles';

const { Option } = Select;
message.config({ maxCount: 1 });

const MyPokemon = () => {
  const user = localStorage.getItem('user') || '';

  const myPokemon = useSelector(getMyPokemonSelector(user));
  const pokemonTypeList = useSelector(getPokemonTypeSelector);
  const loading = useSelector(getLoading);
  const appAction = useActions(AppActions);

  const [list, setList] = useState(myPokemon);
  const [typeList, setTypeList] = useState([]);
  const [typeListResult, setTypeListResult] = useState<Pokemon[]>([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    if(!pokemonTypeList?.length) {
      appAction.getPokemonTypes();
    }
  }, []);

  const onDeleteRecord = (record) => async () => {
    const res = await appAction.deletePokemon(record);
    if(res) {
      const index = (list || []).findIndex(i => i.name === record.name && i.url === record.url);
      setList([
        ...list.slice(0, index),
        ...list.slice(index + 1)
      ]);
      message.success('Pokemon removed from your bag successfully..!');
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

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const list = typeList?.length !== 0 ? typeListResult : myPokemon;
    setSearchName(value);
    if (value) {
      const result = (list || [])?.filter((d: Pokemon) => (d?.name).toLowerCase().includes(value.toLowerCase())) || [];
      setList(result);
    } else {
      setList(list);
    }
  };

  const searchByType = async (value) => {
    return Promise.allSettled(
      (value || []).map(e => {
        return appAction.getPokemonTypeData(e);
      })
    ).then((responseArr: PromiseSettledResult<any>[]) => {
      const status: Array<string> = [];
      const response: Array<any> = [];
      responseArr.forEach((res: any) => {
        status.push(res?.status);
        response.push(res?.value?.data);
      });
      if (!status.includes('rejected')) {
        let typeArr: Pokemon[] = [];
        (response || []).forEach((i: any) => {
          const pokemonArr = (i?.pokemon || []).map(p => p.pokemon);
          typeArr = [...typeArr, ...pokemonArr]
        });
        const filterResult: Pokemon[] | [] = (typeArr || []).filter(o => myPokemon.some(({name}) => o.name === name));
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
      const result = (myPokemon || [])?.filter((d: Pokemon) => (d?.name).toLowerCase().includes(searchName.toLowerCase())) || [];
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
        <SearchInput onSearch={onSearch} />
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