import React from 'react';
import { Select, Form } from 'antd';
import { categoryContractor } from '../../utils/categoryContractor';
import PropTypes from 'prop-types'

const CategoryFormItem = ({ handleCategoryChange }) => {
  return (
    <>
      <Form.Item
        label={'Категория контрагента'}
        name={'category'}
        hasFeedback
        rules={[{ required: true, message: 'Выберите категорию из списка' }]}
      >
        <Select
          placeholder="выбери категорию"
          options={categoryContractor}
          onChange={handleCategoryChange}
        />
      </Form.Item>
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
              <Form.Item
                name="categoryPrice"
                label="Категория цен"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Выберите категорию из списка',
                  },
                ]}
              >
                <Select
                  placeholder="выбери категорию цен"
                  options={optionsPrices}
                />
              </Form.Item>
            )
          );
        }}
      </Form.Item>
    </>
  );
};

CategoryFormItem.propTypes = {
  handleCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFormItem;
