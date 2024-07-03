import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select, Space } from 'antd';
import { customProductsList } from '../../constants/customProductsList';

const SelectCustomValue = ({ name }) => {
  const [inputValue, setInputValue] = React.useState('');
  const form = Form.useFormInstance();

  const handleInputChange = (e) => {
    console.log('handleInputChange', e.target.value);
    setInputValue(e.target.value);
  };
  const onValueChange = (value) => {
    console.log('value', value);
    if (value === 'other') {
      console.log('other', form.getFieldsValue(), inputValue);
      // form.setFieldValue({ name: value });
    }
    // switch (value) {
    //   case 'male':
    //     form.setFieldsValue({
    //       note: 'Hi, man!',
    //     });
    //     break;
    //   case 'female':
    //     form.setFieldsValue({
    //       note: 'Hi, lady!',
    //     });
    //     break;
    //   case 'Other':
    //     form.setFieldsValue({
    //       note: 'Hi there!',
    //     });
    //     break;
    //   default:
    // }
  };
  const onFinish = (values) => {
    console.log('finish', values);
    form.setFieldsValue({
      name: inputValue,
      fullName: inputValue,
    });
  };
  //   const onReset = () => {
  //     form.resetFields();
  //   };

  return (
    <>
      <Form.Item noStyle name={name}>
        <Select
          onChange={onValueChange}
          options={customProductsList}
          allowClear
        />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => {
          console.log('prevValues', prevValues, currentValues);
          return prevValues.name !== currentValues.name;
        }}
      >
        {
          ({ getFieldValue }) =>
            getFieldValue(name) === 'other' ? (
              <Input
                placeholder="Название"
                onChange={handleInputChange}
                onPressEnter={onFinish}
              />
            ) : null
          // <Form.Item no style name={`custom${name}`} >
          //   <Input />
          // </Form.Item>
          // ) : null
        }
      </Form.Item>
    </>
  );
};

SelectCustomValue.propTypes = {};

export default SelectCustomValue;
