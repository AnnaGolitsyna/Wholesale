import React from 'react';
//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../contractorsSlice';
import { emptyContractorObject } from '../../utils/contractors/emptyContractorForm';
import { Select, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';
import ModalItem from '../modalItem/ModalItem';
import ModalCatalogItems from '../modalItem/ModalCatalogItems';
import { getFieldsForContractorsFormList } from '../../utils/contractors/FormLists';

const SelectContractor = (props) => {
  const { isContractorModalOpen, selectedContractor } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
 // console.log('propsSC', props);
  const contractorslist = useContractorsListSelect();

  const addContractor = () => {
    dispatch(openModal(emptyContractorObject));
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
        getFormList={getFieldsForContractorsFormList}
        typeData="Contractor"
      />
    </>
  );
};

//SelectContractor.propTypes = {}

export default SelectContractor;
