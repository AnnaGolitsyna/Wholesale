import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Table,
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
import EditableCell from './EditableCell';
import { EditableRow } from './EditableRow';

const GoodsTable = ({ form }) => {
  const { data, isLoading, isError, error } = useGetGoodsListQuery(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [dataSourceList, setDataSourceList] = useState([]);

  useEffect(() => {
    // const formattedData = data?.map((item) => ({
    //   ...item,
    //   count: 0,
    //   number: '24/'
    // })) || [];
    setFilteredList(data);
    setDataSourceList(data);
  }, [data]);

  const { token } = theme.useToken();

  // console.log('table', dataSourceList, filteredList);

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
  // const handleSave = (row) => {
  //   const newData = [...dataSourceList];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, {
  //     ...item,
  //     ...row,
  //   });
  //   console.log('row', row, newData);
  //   setFilteredList(newData);
  //   setDataSourceList(newData);
  // };
  const handleSave = (row) => {
    // Create new arrays for dataSourceList and filteredList
    // const newDataSourceList = [...dataSourceList];
    // const newFilteredList = [...filteredList];

    // // Find the index of the row in the dataSourceList
    // const index = newDataSourceList.findIndex((item) => row.key === item.key);

    // // If the index is found, update the row
    // if (index !== -1) {
    //   newDataSourceList.splice(index, 1, {
    //     ...newDataSourceList[index],
    //     ...row,
    //   });
    //   newFilteredList.splice(index, 1, {
    //     ...newDataSourceList[index],
    //     ...row,
    //   });
    // }
    const newDataSourceList = dataSourceList.map((item) =>
      item.key === row.key ? { ...item, ...row } : item
    );
    //   {
    //    if (item.key === row.key) {
    //      return { ...item, ...row };
    //    }
    //    return item;
    //  });

    const newFilteredList = filteredList.map((item) =>
      item.key === row.key ? { ...item, ...row } : item
    );
    //   {
    //    if (item.key === row.key) {
    //      return { ...item, ...row };
    //    }
    //    return item;
    //  });
    // Update the states with the new arrays
    setDataSourceList(newDataSourceList);
    setFilteredList(newFilteredList);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('newSelectedRowKeys', newSelectedRowKeys);
    // setDataSourceList(dataSourceList);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // const handleChange = ({ target: { value } }) => {
  //   const formattedData = dataSourceList?.map((item) => ({
  //     ...item,
  //     count: 0,
  //     number: '24/'
  //   })) || [];

  //   if (value === 'selected') {
  //     console.log(
  //       'if',
  //       dataSourceList?.filter((item) => selectedRowKeys.includes(item.key))
  //     );
  //     setFilteredList(
  //       dataSourceList?.filter((item) => selectedRowKeys.includes(item.key))
  //     );
  //     form.setFieldsValue({
  //       productList: dataSourceList?.filter((item) =>
  //         selectedRowKeys.includes(item.key)
  //       ),
  //     });
  //   } else {
  //     setFilteredList(dataSourceList);
  //   }
  // };
  const handleChange = ({ target: { value } }) => {
    let updatedDataSourceList = [];

    if (value === 'selected') {
      updatedDataSourceList = dataSourceList.map((item) => {
        if (selectedRowKeys.includes(item.key)) {
          console.log('if', item);
          return {
            ...item,
            count: item.count || 0,
            number: item.number || '24/',
          };
        }
        return item;
      });
      setDataSourceList(updatedDataSourceList);

      const selectedItems = updatedDataSourceList.filter((item) =>
        selectedRowKeys.includes(item.key)
      );
      setFilteredList(selectedItems);
      form.setFieldsValue({ productList: selectedItems });
    } else {
      setFilteredList(dataSourceList);
    }
  };

  const onSearch = (value) => {
    const foundItems = data?.filter(({ name }) =>
      (name.label || name).toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(foundItems);
  };

  const defaultColumns = getColumns(data, token);

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

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
          onChange={handleChange}
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
            <Table
              rowSelection={rowSelection}
              dataSource={filteredList}
              columns={columns}
              size="small"
              pagination={false}
              components={components}
              rowClassName={() => 'editable-row'}
            />
          </ConfigProvider>
        </Spin>
      )}
    </>
  );
};

GoodsTable.propTypes = {};

export default GoodsTable;
