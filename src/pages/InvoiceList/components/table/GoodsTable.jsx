import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Space, Table, Spin, Tag, Radio, ConfigProvider, theme, Typography } from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { getFormattedDataForFilter } from '../../../../utils/getFormattedDataForFilter';
import { findIsDateInRange } from '../../../../utils/findIsDateInRange';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import TagForNewDate from '../../../../components/tags/TagForNewDate';


const GoodsTable = (props) => {
  const { token } = theme.useToken();
  const { data, isLoading, isError } = useGetGoodsListQuery(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // if (isLoading) return <Spin />;
  //console.log('goodsTable', data, isLoading, isError);
  const goodsList = data?.map(
    ({ key, name, dateStart, cost, superBulk, bulk, retail, supplier }) => ({
      key,
      name,
      dateStart,
      supplier,
      cost,
      superBulk,
      bulk,
      retail,
    })
  );
  const columns = [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
      //   defaultSortOrder: 'ascend',
      //   render: (name) => <>{name.label}</>,
    },

    {
      title: 'В продаже',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (text) => <TagForNewDate date={text} color={token.tableAccent} />,
    },
    {
      title: 'Закупка',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Кр.опт',
      dataIndex: 'superBulk',
      key: 'superBulk',
    },
    {
      title: 'Опт',
      dataIndex: 'bulk',
      key: 'bulk',
    },
    {
      title: 'Розница',
      dataIndex: 'retail',
      key: 'retail',
    },
    {
      title: 'Контрагент',
      dataIndex: 'supplier',
      key: 'supplier',
      // defaultSortOrder: 'ascend',
      render: (supplier) => <>{supplier.label}</>,
      filters: getFormattedDataForFilter(data),
      onFilter: (value, record) => record.supplier.value === value,
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSearch = (value) => {
    console.log('search: ', value);
  };
  return (
    <>
    <Typography.Title level={3} style={{textAlign: 'center'}}>Список товаров в реализации</Typography.Title>
      <Space style={{ margin: 10, display: 'flex', justifyContent: 'space-evenly' }}>
        <Radio.Group
          buttonStyle="solid"
          onChange={handleChange}
          defaultValue={'full'}
        >
          <Radio value="full">Показать все</Radio>
          <Radio value="selected">Показать выделенный</Radio>
        </Radio.Group>
        <SearchInput onChange={onSearch} placeholder={'Поиск по товару'} />
      </Space>
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
            dataSource={goodsList}
            columns={columns}
            size="small"
            pagination={false}
          />
        </ConfigProvider>
      </Spin>
    </>
  );
};

GoodsTable.propTypes = {};

export default GoodsTable;
