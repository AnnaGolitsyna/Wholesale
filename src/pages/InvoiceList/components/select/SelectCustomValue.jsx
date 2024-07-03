import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Space, Button } from 'antd';
import { customProductsList } from '../../constants/customProductsList';

const SelectCustomValue = ({ name }) => {
  const [inputValue, setInputValue] = useState('');
  const form = Form.useFormInstance();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleFinish = () => {
    form.setFieldsValue({
      name: inputValue,
      fullName: inputValue,
    });
  };

  return (
    <>
      <Form.Item noStyle name={name}>
        <Select options={customProductsList} allowClear />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.name !== currentValues.name
        }
      >
        {({ getFieldValue }) =>
          getFieldValue(name) === 'other' ? (
            <Space.Compact
              style={{
                marginTop: 8,
              }}
            >
              <Input
                placeholder="новое название"
                onChange={handleInputChange}
                onPressEnter={handleFinish}
                variant="filled"
              />
              <Button onClick={handleFinish}>Заменить</Button>
            </Space.Compact>
          ) : null
        }
      </Form.Item>
    </>
  );
};

SelectCustomValue.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SelectCustomValue;
