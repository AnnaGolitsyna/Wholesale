import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { ModalModifyItems } from '../../../../features/modifyingItems';
import useContractorsListSelect from '../../hook/useContractorsListSelect';
import { FORM_TYPES, FORM_ACTIONS } from '../../../../constants/formTypes';

const SelectContractor = ({ form, data }) => {
  const contractorslist = useContractorsListSelect();

  const onChange = ({ value, label }) => {
    const selectedSupplier = { value, label };
    form.setFieldsValue({ supplier: selectedSupplier });
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
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
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>{menu}</div>

            <div style={{ textAlign: 'center' }}>
              <ModalModifyItems
                data={null}
                typeData={FORM_TYPES.CONTRACTOR}
                actionType={FORM_ACTIONS.CREATE}
              />
            </div>
          </>
        )}
      />
    </>
  );
};

SelectContractor.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.object,
};

export default SelectContractor;
