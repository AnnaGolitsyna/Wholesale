import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, ConfigProvider } from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';

const GoodsTable = (props) => {
  const { data, isLoading, isError } = useGetGoodsListQuery(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // if (isLoading) return <Spin />;
  //console.log('goodsTable', data, isLoading, isError);
  const goodsList = data?.map(
    ({ key, name, dateStart, cost, superBulk, bulk, retail }) => ({
      key,
      name,
      dateStart,
      cost,
      superBulk,
      bulk,
      retail,
    })
  );
  const columns = [
    {
      title: 'Контрагент',
      dataIndex: 'name',
      key: 'name',
      //   defaultSortOrder: 'ascend',
      //   render: (name) => <>{name.label}</>,
    },
    {
      title: 'В продаже',
      dataIndex: 'dateStart',
      key: 'dateStart',
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
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    //type: 'checkbox',
  };
  return (
    <ConfigProvider
      theme={{
        inherit: false,
  
        components: {
          Table: {
            colorBgContainer: 'red',
            colorFillAlter: 'orange',
          },
        },
      }}
    >
      <Spin spinning={isLoading} size="large">
        <Table
          rowSelection={rowSelection}
          dataSource={goodsList}
          columns={columns}
          size="small"
          pagination={false}
        />
      </Spin>
    </ConfigProvider>
  );
};

GoodsTable.propTypes = {};

export default GoodsTable;
