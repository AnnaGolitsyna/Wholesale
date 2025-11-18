import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, theme, Space } from 'antd';
import EditableTable from '../../../../components/editableTable/EditableTable';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { getProductSelectionColumns } from '../../utils/getProductSelectionColumns';

const filterSelectedItems = (dataList, selectedRowKeys) => {
  return dataList?.filter((item) => selectedRowKeys.includes(item.key));
};

const ProductSelectionTable = ({ data = [], filterType = 'all', onChange }) => {
  const [dataSourceList, setDataSourceList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = theme.useToken();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Transform data to include necessary fields with keys
      const transformedData = data.map((item, index) => {
        const key = item.id || item.key || item.value || `product-${index}`;
        return {
          ...item,
          key,
          // Ensure we have a label field
          label: item.label || item.name || item.productName || 'Без названия',
          // Initialize with default values
          count: item.count || 1,
          scedule: item.scedule || null,
          refundsType: item.refundsType || null,
        };
      });

      setDataSourceList(transformedData);
    } else {
      setDataSourceList([]);
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
    const matchedItems = dataSourceList.filter(
      (item) =>
        (item.label || '').toLowerCase().includes(lowercasedSearch) ||
        (item.name || '').toLowerCase().includes(lowercasedSearch) ||
        (item.productName || '').toLowerCase().includes(lowercasedSearch)
    );

    // Get selected items that don't match the search
    const selectedItemsNotInSearch = dataSourceList.filter(
      (item) =>
        selectedRowKeys.includes(item.key) &&
        !(item.label || '').toLowerCase().includes(lowercasedSearch) &&
        !(item.name || '').toLowerCase().includes(lowercasedSearch) &&
        !(item.productName || '').toLowerCase().includes(lowercasedSearch)
    );

    // Combine matched items with selected items not in search
    const combinedItems = [...selectedItemsNotInSearch, ...matchedItems];
    const uniqueItems = Array.from(
      new Map(combinedItems.map((item) => [item.key, item])).values()
    );

    return uniqueItems;
  }, [dataSourceList, searchTerm, selectedRowKeys]);

  // Apply filter type (all/selected) to search-filtered data
  const updatedData = useMemo(() => {
    const filtered =
      filterType === 'selected'
        ? filterSelectedItems(searchFilteredData, selectedRowKeys)
        : searchFilteredData;

    return filtered;
  }, [searchFilteredData, filterType, selectedRowKeys]);

  const handleSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);

    // Get selected products with their current data
    const selectedProducts = dataSourceList
      .filter((item) => newSelectedRowKeys.includes(item.key))
      .map((item) => ({
        key: item.key,
        id: item.id || item.value,
        label: item.label || item.name || item.productName,
        count: item.count || 1,
        scedule: item.scedule,
        refundsType: item.refundsType,
        supplier: item.supplier,
      }));

    // Notify parent component (ProductSelection) about the change
    if (onChange) {
      onChange(selectedProducts);
    }
  };

  const handleSave = (row) => {
    const newDataSourceList = dataSourceList.map((item) =>
      item.key === row.key ? { ...item, ...row } : item
    );
    setDataSourceList(newDataSourceList);

    // Update selected products if this row is selected
    if (selectedRowKeys.includes(row.key)) {
      const selectedProducts = newDataSourceList
        .filter((item) => selectedRowKeys.includes(item.key))
        .map((item) => ({
          key: item.key,
          id: item.id || item.value,
          label: item.label || item.name || item.productName,
          count: item.count || 1,
          scedule: item.scedule,
          refundsType: item.refundsType,
          supplier: item.supplier,
        }));

      if (onChange) {
        onChange(selectedProducts);
      }
    }
  };

  // Get columns - ensure dataSourceList is always an array
  const defaultColumns = useMemo(() => {
    return getProductSelectionColumns(dataSourceList || []);
  }, [dataSourceList]);

  // Safety check: ensure updatedData is always an array
  const safeUpdatedData = Array.isArray(updatedData) ? updatedData : [];

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <SearchInput
        onChange={handleSearch}
        placeholder="Поиск по наименованию товара"
        autoComplete="off"
      />

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
          dataSource={safeUpdatedData}
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

ProductSelectionTable.propTypes = {
  data: PropTypes.array,
  filterType: PropTypes.string,
  onChange: PropTypes.func,
};

ProductSelectionTable.defaultProps = {
  data: [],
  filterType: 'all',
  onChange: null,
};

export default ProductSelectionTable;
