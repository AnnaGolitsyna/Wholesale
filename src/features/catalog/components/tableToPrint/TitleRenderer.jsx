import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Typography, Space, Drawer, Button } from 'antd';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import { MenuOutlined } from '@ant-design/icons';

const TitleRenderer = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Space align="baseline">
        <Typography.Title level={3}>
          Прайс-лист от {getShortDateFormat(dayjs())}
        </Typography.Title>
      </Space>
      <>
        <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />

        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    </Space>
  );
};

export default TitleRenderer;
