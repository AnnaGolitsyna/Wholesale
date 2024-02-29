import React from 'react'
//import PropTypes from 'prop-types'
import { Radio } from 'antd';

const RadioGroupBool = ({onChange, textObj}) => {
  return (
    <Radio.Group
      defaultValue="true"
      buttonStyle="solid"
      onChange={onChange}
    >
      <Radio.Button value="true">{textObj.true}</Radio.Button>
      <Radio.Button value="false">{textObj.false}</Radio.Button>
    </Radio.Group>
  );
}

//RadioGroupBool.propTypes = {}

export default RadioGroupBool