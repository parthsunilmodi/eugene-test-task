import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SpinLoader } from 'components';
import { getLoading, getMyPokemonSelector } from 'seletors/AppSelector';
import { Container } from './styles';

const Home = () => {
  const navigate = useNavigate();

  const [userName, setUser] = useState('');

  const loading = useSelector(getLoading);
  const myPokemon = useSelector(getMyPokemonSelector(userName));

  const onInputChange = (e) => {
    const { value } = e.target;
    setUser(value);
  };

  const onSubmitName = () => {
    localStorage.setItem('user', userName);
    if(myPokemon?.length) {
      navigate('/bag');
    } else {
      navigate('/all');
    }
  }

  return(
    <Container>
      { loading && <SpinLoader /> }
      <Input placeholder="Enter Your name" data-testid="input" onChange={onInputChange} value={userName} onPressEnter={onSubmitName} />
      <Button type="primary" onClick={onSubmitName}>Submit</Button>
    </Container>
  );
}

export default Home;