import React, { useState } from 'react';
import { AntTable } from './styles';

interface TableInterface {
  columns: Array<any>;
  getPaginationRecord?: any;
  total: number;
  dataSource: Array<{
    name: string;
    url: string;
  }> | [];
}

const Table: React.FC<TableInterface> = (props) => {
  const { columns, dataSource, getPaginationRecord, total } = props;
  const pageSize = 20;

  const [current, setCurrent] = useState(1);

  const getRecords = (page, pageSize) => {
    setCurrent(page);
    getPaginationRecord && getPaginationRecord(page, pageSize);
  };

  const commonProps = {
    total,
    pageSize,
    showSizeChanger: false,
  }

  const paginationProps = getPaginationRecord ?
    {
      ...commonProps,
      current,
      onChange: getRecords
    } : { ...commonProps };

  return(
    <div>
      <AntTable
        className="nested_table"
        size="small"
        scroll={{ x: '100%' }}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          ...paginationProps
        }}
      />
    </div>
  );
}

export default Table;