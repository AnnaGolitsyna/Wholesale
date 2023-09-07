import React from 'react';
import { Space, Image } from 'antd';
import { brandTheme } from '../styles/brandTheme';

const Clients = () => {
  return (
    <Space style={{ color: brandTheme.token.colorPrimary }}>

        <Space>222</Space>

          <Image
            width={200}
            src="/clients.svg"
            preview={false}
            style={{ backgroundColor: brandTheme.token.colorPrimary }}
          />

      
    </Space>
  );
};

export default Clients;
