import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Space, Spin, ConfigProvider, theme, Result } from 'antd';
import EditableTable from '../../../../components/editableTable/EditableTable';
import { getColumns } from './getColumns';
import { getCurrentYearString } from '../../../../utils/dateUtils';

const GoodsEditableTable = ({ data, filterType }) => {
  const [dataSourceList, setDataSourceList] = useState(data);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { token } = theme.useToken();

  const [searchParams] = useSearchParams();
  const defaultSupplier = searchParams.get('supplier');

  console.log('dataSourceList', data, dataSourceList, selectedRowKeys);

    const handleSelectChange = (newSelectedRowKeys) => {
      console.log('newSelectedRowKeys', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
      const updatedList = dataSourceList.map((item) => {
        if (newSelectedRowKeys.includes(item.id)) {
          return {
            ...item,
            count: item.count || 0,
            number: item.number || getCurrentYearString(),
          };
        }
        return item;
      });

      console.log('updatedList', updatedList);
      //setFilteredList(updatedList);
    };

      const handleSave = (row) => {
        console.log('handleSave', row);
        const newDataSourceList = dataSourceList.map((item) =>
          item.key === row.key ? row : item
        );

        // const newFilteredList = filteredList.map((item) =>
        //   item.key === row.key ? row : item
        // );

        // setFilteredList(newFilteredList);

        setDataSourceList(newDataSourceList);
        // form.setFieldsValue({ productList: newFilteredList });
        // form.setFieldsValue({ productList: newDataSourceList });
      };

  const defaultColumns = getColumns(dataSourceList, token, defaultSupplier);
  return (
    <ConfigProvider
      theme={{
        inherit: false,
        components: {
          Table: {
            colorBgContainer: token.tablePrimary,
            colorFillAlter: token.tableSecondary,
          },
        },
      }}
    >
      <EditableTable
        dataSource={dataSourceList}
        defaultColumns={defaultColumns}
        handleSave={handleSave}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectChange,
        }}
      />
    </ConfigProvider>
  );
};

GoodsEditableTable.propTypes = {
    data: PropTypes.array,
};

GoodsEditableTable.defaultProps = {
    data: [],
};

export default GoodsEditableTable;
