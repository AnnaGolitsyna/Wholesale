import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Table,
  Spin,
  Tag,
  Radio,
  ConfigProvider,
  theme,
  Typography,
  Tooltip,
} from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { getFormattedDataForFilter } from '../../../../utils/getFormattedDataForFilter';
import TagForNewDate from '../../../../components/tags/TagForNewDate';

const GoodsTable = (props) => {
  const { token } = theme.useToken();
  const { data, isLoading, isError } = useGetGoodsListQuery(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredList, setFilteredList] = useState(data);
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

  const getFilteredGoodsList = (data) => {
    if (!selectedRowKeys.length) {
      setFilteredList(data);
    } else {
      const filteredData = data?.filter((item) =>
        selectedRowKeys.includes(item.key)
      );
      setFilteredList(filteredData);
    }
    // return data?.filter((item) => selectedRowKeys.includes(item.key));
  };

  useEffect(() => {
    getFilteredGoodsList(goodsList);
  }, [data]);

  // const filteredGoodsList = goodsList?.filter((item) =>
  //   selectedRowKeys.includes(item.key)
  // );

  console.log('filteredGoodsList', data, goodsList, filteredList);

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
    // setFilteredList(filteredGoodsList);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === 'selected') {
      const filteredData = goodsList?.filter((item) =>
        selectedRowKeys.includes(item.key)
      );
      setFilteredList(filteredData);
    } else {
      setFilteredList(goodsList);
    }
  };
  const onSearch = (value) => {
    console.log('search: ', value);
    const foundItems = goodsList?.filter(({ name }) =>
      (name.label || name).toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(foundItems);
  };
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
    </>
  );
};

GoodsTable.propTypes = {};

export default GoodsTable;
