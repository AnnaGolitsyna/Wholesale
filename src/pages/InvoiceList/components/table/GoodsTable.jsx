import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    // const formattedData = data?.map((item) => ({
    //   ...item,
    //   count: 0,
    //   number: '24/'
    // })) || [];
    setFilteredList(data);
  }, [data]);

  const { token } = theme.useToken();

  console.log('table', filteredList);

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
    console.log('row', row);
    const newData = [...filteredList];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setFilteredList(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };


  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleChange = ({ target: { value } }) => {
    const formattedData = data?.map((item) => ({
      ...item,
      count: 0,
      number: '24/'
    })) || [];
    if (value === 'selected') {
      setFilteredList(
        formattedData?.filter((item) => selectedRowKeys.includes(item.key))
      );
      form.setFieldsValue({
        productList: formattedData?.filter((item) => selectedRowKeys.includes(item.key)),
      });
    } else {
      setFilteredList(data);
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
