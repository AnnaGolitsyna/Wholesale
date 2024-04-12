import React from 'react';
import { Space, Skeleton } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';

const SceletonPrintModal = () => {
  return (
    <Space
      direction="vertical"
      style={{ display: 'flex', width: '100%', alignItems: 'center' }}
    >
      <Skeleton
        active
        title={{ width: 550 }}
        paragraph={false}
        style={{ alignSelf: 'center' }}
      />
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <Skeleton
          active
          avatar
          title={false}
          paragraph={{ rows: 2 }}
          style={{ flex: 1, minWidth: 150 }}
        />

        <Skeleton
          active
          avatar
          title={false}
          paragraph={{ rows: 2 }}
          style={{ flex: 2, minWidth: 350 }}
        />
      </Space>
      <Skeleton.Node
        active
        style={{ minWidth: 550, minHeight: 550, alignSelf: 'center' }}
      >
        <DotChartOutlined
          style={{
            fontSize: 100,
            color: '#bfbfbf',
          }}
        />
      </Skeleton.Node>
    </Space>
  );
};


export default SceletonPrintModal;
