import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import DynamicSelectOfCategoryPrice from '../dynamicIyems/DynamicSelectOfCategoryPrice';
import DynamicTableOfRelatedCompanies from '../dynamicIyems/DynamicTableOfRelatedCompanies';

const DynamicFormItem = (props) => {
  const { condition } = props;

  const formsFieldsObject = {
    category: <DynamicSelectOfCategoryPrice {...props} />,
    isRelatedCompanies: <DynamicTableOfRelatedCompanies {...props} />,
  };

  const formsField = formsFieldsObject[condition];

  return <Form.Item noStyle>{formsField}</Form.Item>;
};

DynamicFormItem.propTypes = {
  condition: PropTypes.string.isRequired,
};

export default DynamicFormItem;
