import React from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Table } from 'antd';
import { getProductListColumns } from '../../../../pages/InvoiceList/utils/getProductListColumns';

const DynamicTable = (props) => {
 // console.log('props', props, props.name);
  const { name } = props;
  const dataArray = 'productList';
  const columns = getProductListColumns();

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[dataArray] !== currentValues[dataArray]
      }
    >
      {({ getFieldValue }) => {
        const dataList = getFieldValue(dataArray)?.sort(
          (a, b) => b.active - a.active
        );

        return (
          <Form.Item name={name} noStyle>
            {dataList?.length ? (
              <Table
                dataSource={dataList}
                columns={columns}
                pagination={false}
                size="small"
              />
            ) : (
              <Typography.Text code>Список пуст</Typography.Text>
            )}
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

DynamicTable.propTypes = {
  name: PropTypes.string.isRequired,
  dataArray: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
};

export default DynamicTable;
