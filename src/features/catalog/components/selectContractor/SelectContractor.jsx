import React from 'react';
//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedContractorSelector,
  selectedProductSelector,
} from '../../catalog.selectors';
import { openModalContractor } from '../../contractorsSlice';
import { Select, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';
import ModalCatalogItems from '../modalItem/ModalCatalogItems';

const SelectContractor = ({ form }) => {
  const { isContractorModalOpen, selectedContractor } = useSelector((state) =>
    selectedContractorSelector(state)
  );
  const { _, selectedGoods } = useSelector((state) =>
    selectedProductSelector(state)
  );

  const dispatch = useDispatch();

  const contractorslist = useContractorsListSelect();

  const addContractor = () => {
    dispatch(openModalContractor());
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    form.setFieldsValue({ supplier: value });
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const defaultValue = selectedGoods.supplier;
  console.log('select', selectedGoods, form.getFieldValue('supplier'));
  return (
    <>
      {!isContractorModalOpen && (
        <Select
          defaultValue={defaultValue}
          placeholder="выбери поставщика"
          options={contractorslist}
          // optionFilterProp="children"
          onChange={onChange}
          showSearch
          filterOption={filterOption}
          // labelInValue

          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider />
              <Button
                block
                type="text"
                icon={<PlusOutlined />}
                onClick={addContractor}
              >
                Добавить нового поставщика
              </Button>
            </>
          )}
        />
      )}
      <ModalCatalogItems
        isModalOpen={isContractorModalOpen}
        data={selectedContractor}
        typeData="Contractor"
      />
    </>
  );
};

//SelectContractor.propTypes = {}

export default SelectContractor;
