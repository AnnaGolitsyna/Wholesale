import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { Space, Spin, ConfigProvider, theme, Result } from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { getColumns } from '../table/getColumns';
import EditableTable from '../../../../components/editableTable/EditableTable';
import { getCurrentYearString } from '../../../../utils/dateUtils';
import { ModalModifyItems } from '../../../../features/modifyingItems';
import RadioGroupForGoodsTable from '../radioGroup/RadioGroupForGoodsTable';
import GoodsEditableTable from '../table/GoodsEditableTable';

const GoodsAddition = () => {
  const { data, isLoading, isError, error } = useGetGoodsListQuery(true);

  const [searchList, setSearchList] = useState(data);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    setSearchList(data);
  }, [data]);

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
  };
  const onSearch = (value) => {
    const foundItems = data?.filter(({ name }) =>
      (name.label || name).toLowerCase().includes(value.toLowerCase())
    );
    console.log('onSearch', foundItems);
    setSearchList(foundItems);
  };

  return (
    <>
      <Space
        style={{ margin: 10, display: 'flex', justifyContent: 'space-evenly' }}
      >
        <RadioGroupForGoodsTable onFilterChange={handleFilterTypeChange} />
        <ModalModifyItems data={null} typeData="Goods" actionType="create" />
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
          <GoodsEditableTable data={searchList} filterType={filterType} />
        </Spin>
      )}
    </>
  );
};

export default GoodsAddition;
