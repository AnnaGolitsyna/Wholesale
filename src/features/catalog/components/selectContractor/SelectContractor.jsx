import React from 'react';
//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { selectedContractorSelector } from '../../catalog.selectors';
import { openModalContractor } from '../../contractorsSlice';
//import { emptyContractorObject } from '../../utils/contractors/emptyContractorForm';
import { Select, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';
import ModalCatalogItems from '../modalItem/ModalCatalogItems';

const SelectContractor = () => {
  const { isContractorModalOpen, selectedContractor } = useSelector((state) =>
    selectedContractorSelector(state)
  );
  const dispatch = useDispatch();

  const contractorslist = useContractorsListSelect();

  const addContractor = () => {
    dispatch(openModalContractor());
  };
  return (
    <>
      {!isContractorModalOpen && (
        <Select
          placeholder="выбери поставщика"
          options={contractorslist}
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
