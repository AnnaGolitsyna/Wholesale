import React from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider } from 'antd';

const TableToPrint = ({ data, columns }) => {
  const dataSource = [...data]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((el, index) => ({ ...el, index: index + 1 }));

  return (
    <>
      {/* <ConfigProvider
        theme={{
          components: {
            Table: {
              cellPaddingBlockSM: 1,
              borderColor: '#8c8c8c',
              cellFontSizeSM: 13,

            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          size="small"
          bordered
        />
      </ConfigProvider> */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        bordered
      />
    </>
  );
};

TableToPrint.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableToPrint;
