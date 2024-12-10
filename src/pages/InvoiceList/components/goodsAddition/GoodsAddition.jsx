import React, { useEffect, useState } from 'react';
import { Space, Spin, Result } from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../../features/modifyingItems';
import RadioGroupForGoodsTable from '../radioGroup/RadioGroupForGoodsTable';
import GoodsEditableTable from '../table/GoodsEditableTable';
import { FORM_TYPES, FORM_ACTIONS } from '../../../../constants/formTypes';

const GoodsAddition = () => {
  const { data, isLoading, isError, error } = useGetGoodsListQuery(true);
  const [searchList, setSearchList] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (data) {
      setSearchList(data);
    }
  }, [data]);

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
  };
  const onSearch = (value) => {
    const foundItems = data?.filter(({ name }) =>
      (name.label || name).toLowerCase().includes(value.toLowerCase())
    );

    setSearchList(foundItems);
  };

  return (
    <>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: 5,
        }}
      >
        <ModalModifyItems
          data={null}
          typeData={FORM_TYPES.GOODS}
          actionType={FORM_ACTIONS.CREATE}
        />
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
          <>
            <GoodsEditableTable data={searchList} filterType={filterType} />
            <RadioGroupForGoodsTable onFilterChange={handleFilterTypeChange} />
          </>
        </Spin>
      )}
    </>
  );
};

export default GoodsAddition;
