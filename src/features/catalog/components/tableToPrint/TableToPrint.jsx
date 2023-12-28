import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { getShortDateFormat } from '../../../../utils/dateUtils';

const TableToPrint = ({ data, columns }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          inherit: false,
        }}
      >

        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
          title={() => `Прайс-лист от ${getShortDateFormat(dayjs())}`}
          bordered
        />
      </ConfigProvider>
    </>
  );
};

TableToPrint.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableToPrint;
