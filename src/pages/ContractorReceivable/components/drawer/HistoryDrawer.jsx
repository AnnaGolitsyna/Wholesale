import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const HistoryDrawer = ({ textLink, icon }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Typography.Link italic onClick={showDrawer}>
        {textLink}
        {icon}
      </Typography.Link>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

HistoryDrawer.propTypes = {};

export default HistoryDrawer;
