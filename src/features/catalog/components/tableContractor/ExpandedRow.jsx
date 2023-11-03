import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Table, theme } from 'antd';

const ExpandedRow = ({ record, isExpanded }) => {
  const { token } = theme.useToken();

  if (!isExpanded) {
    return null;
  }
  
  const columns = [
    {
      title: 'Полное имя',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Адрес',
      dataIndex: 'adress',
      key: 'adress',
    },

    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Налоговый код',
      dataIndex: 'taxNumber',
      key: 'taxNumber',
    },
    {
      title: 'Номер договора',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
    },
    {
      title: 'от',
      dataIndex: 'contractDate',
      key: 'contractDate',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        components: {
          Table: {
            colorFillAlter: token.colorBgBaseLight,
          },
        },
      }}
    >
      <Table columns={columns} dataSource={[record]} pagination={false} />
    </ConfigProvider>
  );
};

ExpandedRow.propTypes = {
  record: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ExpandedRow;
