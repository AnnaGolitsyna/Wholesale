import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Table, theme } from 'antd';

const ExpandedRow = ({ record, isExpanded, nestedColumns }) => {
  const { token } = theme.useToken();

  if (!isExpanded) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorFillAlter: token.colorBgAccent,
          },
        },
      }}
    >
      <Table
        columns={nestedColumns}
        dataSource={record}
        bordered={true}
        pagination={false}
      />
    </ConfigProvider>
  );
};

ExpandedRow.propTypes = {
  record: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  nestedColumns: PropTypes.array.isRequired,
};

export default ExpandedRow;
