import styled from 'styled-components';
import { Table } from 'antd';

export const AntTable = styled(Table)`
  .ant-table-cell {
    padding: 16px;
    text-align: center;
    input {
      height: 32px;
    }
  }
  .ant-table-thead{
    .ant-table-cell{
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      color:#FFF;;
      padding: 16px;
      text-align: center;
      border: none;
      background: #001529;
      border-bottom: 1px solid #f0f0f0;
    }
  }
  .ant-pagination {
    margin: 16px 80px;
  }
  .ant-table-expanded-row-fixed {
    width: auto !important;
  }
`;
