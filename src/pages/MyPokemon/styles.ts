import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
`;

export const DeleteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: rgb(251, 254, 255);
  border-radius: 6px;
  border: 1px solid rgb(230, 244, 248);
  margin: 0 auto;
`;

export const FilterWrap = styled.div`
  display: flex;
  .ant-input-affix-wrapper {
    max-width: 25%;
    margin-bottom: 20px;
    margin-right: 10px;
  }
  .ant-select {
    width: 30% !important;
  }
`;
