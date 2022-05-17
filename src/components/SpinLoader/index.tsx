import React, { FC } from 'react';
import { LoadingWrapper, AntLoader } from './styles';

const SpinLoader: FC = () => {
  return (
    <LoadingWrapper>
      <AntLoader size="large" />
    </LoadingWrapper>
  );
};

export default SpinLoader;
