import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Table, theme } from 'antd';
import { nestedColumns } from '../../utils/contractors/columns';

const ExpandedRow = ({ record, isExpanded }) => {
  const { token } = theme.useToken();

  if (!isExpanded) {
    return null;
  }

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
      <Table columns={nestedColumns} dataSource={[record]} pagination={false} />
    </ConfigProvider>
  );
};

ExpandedRow.propTypes = {
  record: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ExpandedRow;
