import React from 'react';
import PropTypes from 'prop-types';
import { Space, Button } from 'antd';
import CursorSvg from '../../../../styles/icons/CursorIcon';

const PriceBtn = React.forwardRef(({onClick}, ref) => (
     <Button ref={ref} block type="text" onClick={onClick}>
       <Space
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <CursorSvg style={{ fontSize: 40 }} />
        <span>Рассчитать цены реализации</span>
      </Space>
    </Button>
));

PriceBtn.propTypes = {
  onClick: PropTypes.func,
};

export default PriceBtn;


