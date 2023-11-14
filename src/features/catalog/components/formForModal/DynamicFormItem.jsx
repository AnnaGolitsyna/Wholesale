import React from 'react';
//import PropTypes from 'prop-types'
import { Form } from 'antd';

const DynamicFormItem = ({
  shouldUpdateValue,
  element,
 
  categoryList,
}) => {
  const { name, label, component, rules, hasFeedback, tooltip, valuePropName } =
    element;
  return (
    <Form.Item
      key={name}
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[shouldUpdateValue] !== currentValues[shouldUpdateValue]
      }
    >
      {({ getFieldValue }) => {
        const categoryDetails = categoryList.find(
          (category) => category.value === getFieldValue(shouldUpdateValue)
        );

        const optionsPrices = categoryDetails?.children?.map(
          ({ label, value }) => ({
            label,
            value,
          })
        );

        return (
          optionsPrices && (
            <Form.Item
              key={name}
              label={label}
              name={name}
              rules={rules}
              hasFeedback={hasFeedback}
              tooltip={tooltip}
              valuePropName={valuePropName}
            >
              {component(optionsPrices)}
            </Form.Item>
          )
        );
      }}
    </Form.Item>
  );
};

//DynamicFormItem.propTypes = {}

export default DynamicFormItem;
