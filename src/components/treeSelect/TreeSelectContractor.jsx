import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useSearchParams } from 'react-router-dom';
import { TreeSelect } from 'antd';
import useGetContractorsTreeSelect from '../../hook/useGetContractorsTreeSelect';
import { ModalModifyItems } from '../../features/modifyingItems';
import { categoryPricesObj } from '../../utils/priceUtils';
import { splitAdditionalId } from '../../utils/splitAdditionalId';
import { FORM_TYPES, FORM_ACTIONS } from '../../constants/formTypes';
import { OPERATION_TYPES } from '../../constants/operationTypes';

const TreeSelectContractor = ({ form, data }) => {
  const { docType } = useParams();
  const [_, setSearchParams] = useSearchParams();
  const contractorslist = useGetContractorsTreeSelect(
    docType || OPERATION_TYPES.PAYMENTS
  );

  const isSetParams = docType === OPERATION_TYPES.PURCHASE;

  const handleTreeSelectChange = (value) => {
    const prodList = form.getFieldValue('productList');
    if (!prodList) return;

    const newProductList = prodList.map((product) => {
      return {
        ...product,
        selectedPrice: product[value],
      };
    });

    form.setFieldsValue({ productList: newProductList });
  };

  const onChange = (newValue) => {
    if (isSetParams) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set('supplier', newValue.value);
        return newParams;
      });
    }

    const priceType = contractorslist.find(
      (item) => item.value === splitAdditionalId(newValue.value)
    ).categoryPrice;

    form.setFieldsValue({
      name: { value: newValue.value, label: newValue.label },
      priceType: {
        value: priceType,
        label: categoryPricesObj[priceType].label,
      },
    });

    handleTreeSelectChange(priceType);
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
      treeDefaultExpandAll
      style={{
        width: '100%',
      }}
      dropdownRender={(menu) => (
        <>
          <div>{menu}</div>
          <div style={{ textAlign: 'center' }} >
            <ModalModifyItems
              data={null}
              typeData={FORM_TYPES.CONTRACTOR}
              actionType={FORM_ACTIONS.CREATE}
            
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
