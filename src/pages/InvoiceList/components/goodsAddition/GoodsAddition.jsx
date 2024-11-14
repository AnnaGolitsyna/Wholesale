import React, { useEffect, useState } from 'react';
import { Space, Spin,  Result, Form } from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../../features/modifyingItems';
import RadioGroupForGoodsTable from '../radioGroup/RadioGroupForGoodsTable';
import GoodsEditableTable from '../table/GoodsEditableTable';
import {FORM_TYPES} from "../../../../constants/formTypes";

const GoodsAddition = () => {
  const { data, isLoading, isError, error } = useGetGoodsListQuery(true);
  const [searchList, setSearchList] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const form = Form.useFormInstance();

  const contractor = form.getFieldsValue();

  useEffect(() => {
     if (data) {
       setSearchList(data);
     }
     console.log('filter', filterType, data, contractor);

  }, [data]);

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
    console.log('handleFilterTypeChange', value);

  };
  const onSearch = (value) => {
    const foundItems = data?.filter(({ name }) =>
      (name.label || name).toLowerCase().includes(value.toLowerCase())
    );
   // console.log('onSearch', foundItems);
    setSearchList(foundItems);
  };

  return (
    <>
      <Space
        style={{ margin: 10, display: 'flex', justifyContent: 'space-evenly' }}
      >
        <RadioGroupForGoodsTable onFilterChange={handleFilterTypeChange} />
        <ModalModifyItems data={null} typeData={FORM_TYPES.GOODS} actionType="create" />
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
