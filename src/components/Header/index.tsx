import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Container } from './styles';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return(
    <Container>
      {
        location?.pathname !== '/' ?
          <HomeOutlined onClick={() => navigate('/')} />
          :
          <div />
      }
      Pokemon App
      {
        location?.pathname === '/' ?
          <div />
          :
          <div>
            <Button type="primary" onClick={() => navigate('/all')}>All Pokemon</Button>
            <Button type="primary" onClick={() => navigate('/bag')}>My Pokemon</Button>
          </div>
      }
    </Container>
  );
}

export default Header;