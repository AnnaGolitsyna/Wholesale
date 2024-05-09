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

const GoodsTable = ({ form }) => {
  const { data, isLoading, isError, error } = useGetGoodsListQuery(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(data || []);
  }, [data]);

  const { token } = theme.useToken();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleChange = ({ target: { value } }) => {
    if (value === 'selected') {
      setFilteredList(
        data?.filter((item) => selectedRowKeys.includes(item.key))
      );
      form.setFieldsValue({
        productList: data?.filter((item) => selectedRowKeys.includes(item.key)),
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

  const columns = getColumns(data, token);

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
            />
          </ConfigProvider>
        </Spin>
      )}
    </>
  );
};

GoodsTable.propTypes = {};

export default GoodsTable;
