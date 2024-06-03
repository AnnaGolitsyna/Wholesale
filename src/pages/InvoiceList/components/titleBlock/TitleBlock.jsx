import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Space } from 'antd';
import FileIcon from '../../../../styles/icons/FileIcon';

const TitleBlock = ({title, docNumber}) => {
  return (
    <Space>
      <FileIcon />
      <Typography.Title level={3}>{`${title} ${docNumber}`}</Typography.Title>
    </Space>
  );
}

TitleBlock.propTypes = {}

export default TitleBlock