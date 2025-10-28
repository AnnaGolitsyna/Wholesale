import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, ConfigProvider, theme, Space } from 'antd';
import EditableTable from '../../../../components/editableTable/EditableTable';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { getColumns } from './getColumns';
import { filterSelectedItems } from '../../utils/filterSelectedItems';
import { getCurrentYearString } from '../../../../utils/dateUtils';

const GoodsEditableTable = ({ data, filterType }) => {
  const [dataSourceList, setDataSourceList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data) {
      setDataSourceList(data);
    }
  }, [data]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Filter data based on search term while preserving selected items
  const searchFilteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return dataSourceList;
    }

    const lowercasedSearch = searchTerm.toLowerCase();

    // Get items that match the search
    const matchedItems = dataSourceList.filter(({ name }) =>
      (name.label || name).toLowerCase().includes(lowercasedSearch)
    );

    // Get selected items that don't match the search
    const selectedItemsNotInSearch = dataSourceList.filter(
      (item) =>
        selectedRowKeys.includes(item.key) &&
        !(item.name.label || item.name).toLowerCase().includes(lowercasedSearch)
    );

    // Combine matched items with selected items not in search
    // Remove duplicates by key
    const combinedItems = [...selectedItemsNotInSearch, ...matchedItems];
    const uniqueItems = Array.from(
      new Map(combinedItems.map((item) => [item.key, item])).values()
    );

    return uniqueItems;
  }, [dataSourceList, searchTerm, selectedRowKeys]);

  // Apply filter type (all/selected) to search-filtered data
  const updatedData = useMemo(() => {
    return filterType === 'selected'
      ? filterSelectedItems(searchFilteredData, selectedRowKeys)
      : searchFilteredData;
  }, [searchFilteredData, filterType, selectedRowKeys]);

  const form = Form.useFormInstance();
  const { token } = theme.useToken();

  const [searchParams] = useSearchParams();
  const defaultSupplier = searchParams.get('supplier');

  const handleSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const updatedList = dataSourceList.map((item) => {
      if (newSelectedRowKeys.includes(item.key)) {
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
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <SearchInput onChange={handleSearch} placeholder={'Поиск по товару'} />

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
    </Space>
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
