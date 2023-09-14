import React from 'react';
// import PropTypes from 'prop-types'
import { Image } from 'antd';

const ImageInvoice = ({src, color}) => {
  return (
    <Image
      height="155px"
      width='100%'
      src={src}
      preview={false}
      style={{ backgroundColor: color }}
    />
  );
};

// imageInvoice.propTypes = {}

export default ImageInvoice;
