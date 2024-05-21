import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Table, Input, Statistic } from 'antd';
import { getProductListColumns } from '../../../../pages/InvoiceList/utils/getProductListColumns';
import EditableTable from '../../../../components/editableTable/EditableTable';

const DynamicTable = (props) => {
  // console.log('props', props, props.name);

  const form = Form.useFormInstance();
  const { name } = props;
  const dataArray = 'productList';
  const columns = getProductListColumns(form);

  // const [count, setCount] = useState(2);

  const handleSave = (row) => {
    const dataList = form
      .getFieldValue(dataArray)
      .map((item) => (item.key === row.key ? row : item));
    // {
    //   if (item.key === row.key) {
    //     return row;
    //   }
    //   return item;
    // }) || [];
    console.log('handleSave', row, dataList);

    form.setFieldsValue({
      [dataArray]: [...dataList],
    });
  };

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
              // <Table
              //   dataSource={dataList}
              //   columns={columns}
              //   pagination={false}
              //   size="small"
              //   bodered
              //   // components={components}
              //   // rowClassName={() => 'editable-row'}
              // />
              <EditableTable
                dataSource={dataList}
                defaultColumns={columns}
                handleSave={handleSave}
              />
            ) : (
              <Table dataSource={[]} columns={columns} />
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
  // columns: PropTypes.array.isRequired,
};

export default DynamicTable;
