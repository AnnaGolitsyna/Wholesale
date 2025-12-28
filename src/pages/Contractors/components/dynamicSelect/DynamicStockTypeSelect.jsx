import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import { stockType } from '../../../../constants/productsDetail';

const DynamicStockTypeSelect = ({ name }) => {
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues.category !== currentValues.category
      }
    >
      {({ getFieldValue }) => {
        const category = getFieldValue('category');
        const shouldHide = !category || category === 'supplier';

        return (
          <Form.Item
            name={name}
            hidden={shouldHide}
            rules={
              !shouldHide
                ? [
                    {
                      required: true,
                      message: 'Выберите тип точки продажи',
                    },
                  ]
                : []
            }
          >
            <Select
              placeholder="выбери тип"
              options={Object.values(stockType)}
              disabled={shouldHide}
            />
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

DynamicStockTypeSelect.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DynamicStockTypeSelect;
