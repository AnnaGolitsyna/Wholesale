import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Spin,
  Radio,
  ConfigProvider,
  theme,
  Typography,
  Result,
} from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { getColumns } from './getColumns';
import EditableTable from '../../../../components/editableTable/EditableTable';
import { getCurrentYearString } from '../../../../utils/dateUtils';

const GoodsTable = ({ form }) => {
  const { data, isLoading, isError, error } = useGetGoodsListQuery(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSourceList, setDataSourceList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(data);
    setDataSourceList(data);
  }, [data]);

  const getSelectedItems = (arr) =>
    arr?.filter((item) => selectedRowKeys.includes(item.key));

  useEffect(() => {
    const selectedItems = getSelectedItems(dataSourceList);
    form.setFieldsValue({ productList: selectedItems });
  }, [selectedRowKeys, dataSourceList]);

  const { token } = theme.useToken();

  const handleDelete = (key) => {
    console.log('delete', key);
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };
  // const defaultColumns = [
  //   {
  //     title: 'name',
  //     dataIndex: 'name',
  //     width: '30%',
  //     editable: true,
  //   },
  //   {
  //     title: 'age',
  //     dataIndex: 'age',
  //   },
  //   {
  //     title: 'address',
  //     dataIndex: 'address',
  //   },
  //   {
  //     title: 'operation',
  //     dataIndex: 'operation',
  //     render: (_, record) =>
  //       dataSource.length >= 1 ? (
  //         <Popconfirm
  //           title="Sure to delete?"
  //           onConfirm={() => handleDelete(record.key)}
  //         >
  //           <a>Delete</a>
  //         </Popconfirm>
  //       ) : null,
  //   },
  // ];
  const handleAdd = () => {
    //   const newData = {
    //     key: count,
    //     name: `Edward King ${count}`,
    //     age: '32',
    //     address: `London, Park Lane no. ${count}`,
    //   };
    //  // setDataSource([...dataSource, newData]);
    //   setCount(count + 1);
  };

  const handleSave = (row) => {
    const newDataSourceList = dataSourceList.map((item) =>
      item.key === row.key ? row : item
    );

    const newFilteredList = filteredList.map((item) =>
      item.key === row.key ? row : item
    );

    setDataSourceList(newDataSourceList);
    setFilteredList(newFilteredList);
    form.setFieldsValue({ productList: newFilteredList });
  };

  const handleFilterChange = ({ target: { value } }) => {
    let filteredDataSourceList;

    if (value === 'selected') {
      filteredDataSourceList = dataSourceList.map((item) =>
        selectedRowKeys.includes(item.key)
          ? {
              ...item,
              count: item.count || 0,
              number: item.number || getCurrentYearString(),
            }
          : item
      );
    } else {
      filteredDataSourceList = dataSourceList;
    }

    setDataSourceList(filteredDataSourceList);
    setFilteredList(
      value === 'selected'
        ? getSelectedItems(filteredDataSourceList)
        : filteredDataSourceList
    );
  };

  const onSearch = (value) => {
    const foundItems = data?.filter(({ name }) =>
      (name.label || name).toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(foundItems);
  };

  const defaultColumns = getColumns(data, token);

  return (
    <>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        Список товаров в реализации
      </Typography.Title>
      <Space
        style={{ margin: 10, display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Radio.Group
          buttonStyle="solid"
          onChange={handleFilterChange}
          defaultValue={'full'}
        >
          <Radio value="full">Показать весь список</Radio>
          <Radio value="selected">Показать выбранные товары</Radio>
        </Radio.Group>
        <SearchInput onChange={onSearch} placeholder={'Поиск по товару'} />
      </Space>
      {isError ? (
        <Result
          status={error.status}
          title={error.data}
          subTitle={error.data && <p>Данных не найдено</p>}
        />
      ) : (
        <Spin spinning={isLoading} size="large">
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
              dataSource={filteredList}
              defaultColumns={defaultColumns}
              handleSave={handleSave}
              rowSelection={{
                selectedRowKeys,
                onChange: (newSelectedRowKeys) =>
                  setSelectedRowKeys(newSelectedRowKeys),
              }}
            />
          </ConfigProvider>
        </Spin>
      )}
    </>
  );
};

GoodsTable.propTypes = {};

export default GoodsTable;
