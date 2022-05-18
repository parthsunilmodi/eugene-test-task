import styled from 'styled-components';
import { Spin } from 'antd';

export const LoadingWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  background: rgba(255, 255, 255, 0.7);
`;

export const AntLoader = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #027A9D;
  }
`;
