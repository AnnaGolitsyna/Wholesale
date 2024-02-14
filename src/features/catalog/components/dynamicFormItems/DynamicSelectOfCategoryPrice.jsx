import React from 'react';
//import PropTypes from 'prop-types'
import { Form, Select } from 'antd';
import { categoryContractor } from '../../../../constants/categoryContractor';

const DynamicSelectOfCategoryPrice = (props) => {
  console.log('props', props);
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues.category !== currentValues.category
      }
    >
      {({ getFieldValue }) => {
        const categoryDetails = categoryContractor.find(
          (category) => category.value === getFieldValue('category')
        );
        const optionsPrices = categoryDetails?.children?.map(
          ({ label, value }) => ({
            label,
            value,
          })
        );
        return (
          optionsPrices && (
            <Form.Item name={props.name} noStyle>
              <Select
                placeholder="выбери категорию цен"
                options={optionsPrices}
              />
            </Form.Item>
          )
        );
      }}
    </Form.Item>
  );
};

//DynamicSelectOfCategoryPrice.propTypes = {}

export default DynamicSelectOfCategoryPrice;
