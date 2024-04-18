import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import useGetContractorsTreeSelect from '../../hook/useGetContractorsTreeSelect';
import { ModalModifyItems } from '../../features/modifyingItems';

const TreeSelectContractor = () => {
  const contractorslist = useGetContractorsTreeSelect();
  const onChange = (newValue) => {
    console.log('onChange', newValue);
    // form.setFieldsValue({ supplier: selectedSupplier });
  };

  const filterOption = (input, option) =>
    (option?.title ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <TreeSelect
      // defaultValue={data?.supplier}
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
      dropdownStyle={{ zIndex: 950 }}
      dropdownRender={(menu) => (
        <>
          <div>{menu}</div>
          <div style={{ textAlign: 'center' }}>
            <ModalModifyItems
              data={null}
              typeData="Contractor"
              actionType="create"
            />
          </div>
        </>
      )}
    />
  );
};

TreeSelectContractor.propTypes = {};

export default TreeSelectContractor;
