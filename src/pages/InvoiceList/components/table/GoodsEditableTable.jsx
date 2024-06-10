import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, ConfigProvider, theme } from 'antd';
import EditableTable from '../../../../components/editableTable/EditableTable';
import { getColumns } from './getColumns';
import { filterSelectedItems } from '../../utils/filterSelectedItems';
import { getCurrentYearString } from '../../../../utils/dateUtils';

const GoodsEditableTable = ({ data, filterType }) => {
  const [dataSourceList, setDataSourceList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    if (data) {
      setDataSourceList(data);
    }
  }, [data]);

  const updatedData = useMemo(() => {
    return filterType === 'selected'
      ? filterSelectedItems(dataSourceList, selectedRowKeys)
      : dataSourceList;
  }, [dataSourceList, filterType, selectedRowKeys]);

  const form = Form.useFormInstance();
  const { token } = theme.useToken();

  const [searchParams] = useSearchParams();
  const defaultSupplier = searchParams.get('supplier');

  const handleSelectChange = (newSelectedRowKeys) => {
    //  console.log('newSelectedRowKeys', newSelectedRowKeys);
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

    setDataSourceList(updatedList);
    form.setFieldsValue({
      productList: filterSelectedItems(updatedList, newSelectedRowKeys),
    });
  };

  const handleSave = (row) => {
    // console.log('handleSave', row);
    const newDataSourceList = dataSourceList.map((item) =>
      item.key === row.key ? row : item
    );
    setDataSourceList(newDataSourceList);
    form.setFieldsValue({
      productList: filterSelectedItems(newDataSourceList, selectedRowKeys),
    });
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
        dataSource={updatedData}
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
  filterType: PropTypes.string,
};

GoodsEditableTable.defaultProps = {
  data: [],
  filterType: 'all',
};

export default GoodsEditableTable;
