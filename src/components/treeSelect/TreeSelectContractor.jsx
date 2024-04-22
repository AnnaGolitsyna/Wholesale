import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import useGetContractorsTreeSelect from '../../hook/useGetContractorsTreeSelect';
import { ModalModifyItems } from '../../features/modifyingItems';

const TreeSelectContractor = ({form, data}) => {
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

TreeSelectContractor.propTypes = {};

export default TreeSelectContractor;
