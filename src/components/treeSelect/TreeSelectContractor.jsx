import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import useGetContractorsTreeSelect from '../../hook/useGetContractorsTreeSelect';
import { ModalModifyItems } from '../../features/modifyingItems';

const TreeSelectContractor = ({ form, data }) => {
  const contractorslist = useGetContractorsTreeSelect();
  const onChange = (newValue) => {
    console.log('onChange', newValue);
    form.setFieldsValue({
      name: { value: newValue.value, label: newValue.label },
    });
  };

  const filterOption = (input, option) =>
    (option?.title ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <TreeSelect
      defaultValue={data?.name}
      placeholder="выбери поставщика"
      onChange={onChange}
      treeData={contractorslist}
      showSearch
      filterTreeNode={filterOption}
      labelInValue
      //   maxTagCount={5}
      //   maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} more`}
      treeDefaultExpandAll
      style={{
        width: '100%',
      }}
      dropdownRender={(menu) => (
        <>
          <div>{menu}</div>
          <div style={{ textAlign: 'center' }} id="modal">
            <ModalModifyItems
              data={null}
              typeData="Contractor"
              actionType="create"
              elementId="modal"
            />
          </div>
        </>
      )}
    />
  );
};

TreeSelectContractor.propTypes = {
  form: PropTypes.object,
  data: PropTypes.object,
};

export default TreeSelectContractor;
