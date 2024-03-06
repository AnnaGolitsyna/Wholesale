import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectedContractorSelector } from '../../../../pages/Contractors/api/selectors';
import { openModalContractor } from '../../../../pages/Contractors/api/contractorsSlice';
import { Select, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalCatalogItems from '../../modals/ModalModifyItems';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';
import {ModalModifyItems} from '../../modals/ModalModifyItems';
const SelectContractor = ({ form, data }) => {
  const { isContractorModalOpen, selectedContractor } = useSelector((state) =>
    selectedContractorSelector(state)
  );

  const contractorslist = useContractorsListSelect();

  const dispatch = useDispatch();

  const addContractor = () => {
    dispatch(openModalContractor());
  };

   const onChange = ({ value, label }) => {
     const selectedSupplier = { value, label };
     console.log('selCom', value, selectedSupplier);

     form.setFieldsValue({ supplier: selectedSupplier });
   };


  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {!isContractorModalOpen && (
        <Select
          defaultValue={data?.supplier}
          placeholder="выбери поставщика"
          options={contractorslist}
          onChange={onChange}
          showSearch
          filterOption={filterOption}
          labelInValue
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
      {/* <ModalCatalogItems
        isModalOpen={isContractorModalOpen}
        data={selectedContractor}
        typeData="Contractor"
        actionType="create"
      /> */}
      <ModalModifyItems />
    </>
  );
};

SelectContractor.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.object,
};

export default SelectContractor;
