import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd';
import { categoryContractor } from '../../../../constants/categoryContractor';

const DynamicSelect = ({name}) => {

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
         <Form.Item name={name} noStyle>
           <Select
             placeholder={'выбери категорию цен'}
             options={optionsPrices}
             disabled={!optionsPrices}
           />
         </Form.Item>
       );
     }}
   </Form.Item>
 );
}

DynamicSelect.propTypes = {
  name: PropTypes.string.isRequired,
}

export default DynamicSelect