import React, { useState } from 'react';
import { Space, Spin, Result } from 'antd';
import { useGetGoodsListQuery } from '../../../Goods';
import { ModalModifyItems } from '../../../../features/modifyingItems';
import RadioGroupForGoodsTable from '../radioGroup/RadioGroupForGoodsTable';
import GoodsEditableTable from '../table/GoodsEditableTable';
import { FORM_TYPES, FORM_ACTIONS } from '../../../../constants/formTypes';

const GoodsAddition = () => {
  const { data, isLoading, isError, error } = useGetGoodsListQuery(true);
  const [filterType, setFilterType] = useState('all');

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
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
            <GoodsEditableTable data={data} filterType={filterType} />
            <RadioGroupForGoodsTable onFilterChange={handleFilterTypeChange} />
          </>
        </Spin>
      )}
    </>
  );
};

export default GoodsAddition;
