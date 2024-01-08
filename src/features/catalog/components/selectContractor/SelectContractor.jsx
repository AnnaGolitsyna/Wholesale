import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedContractorSelector,

} from '../../catalog.selectors';
import { openModalContractor } from '../../contractorsSlice';
import { Select, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalCatalogItems from '../modalItem/ModalCatalogItems';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';

const SelectContractor = ({ form, data }) => {
  const { isContractorModalOpen, selectedContractor } = useSelector((state) =>
    selectedContractorSelector(state)
  );

  const contractorslist = useContractorsListSelect();

  const dispatch = useDispatch();

  const addContractor = () => {
    dispatch(openModalContractor());
  };

  const onChange = (value) => {
    form.setFieldsValue({ supplier: value });
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {!isContractorModalOpen && (
        <Select
          defaultValue={data.supplier}
          placeholder="выбери поставщика"
          options={contractorslist}
          onChange={onChange}
          showSearch
          filterOption={filterOption}
          maxTagCount={5}
          maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} more`}
          dropdownRender={(menu) => (
            <>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {menu}
              </div>
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
        actionType="create"
      />
    </>
  );
};

SelectContractor.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default SelectContractor;
