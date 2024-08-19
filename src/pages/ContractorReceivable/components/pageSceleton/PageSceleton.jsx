import React from 'react';
import { Skeleton, Space, Flex } from 'antd';
import { boxStyle } from '../../../../styles/boxStyle';

const PageSkeleton = () => {
  return (
    <Flex vertical style={{ height: '100%', overflow: 'hidden' }}>
      {/* Header Skeleton */}
      <div style={{ ...boxStyle, padding: '16px', marginBottom: '16px' }}>
        <Flex justify="space-between" align="center">
          <Space>
            <Skeleton.Avatar size="large" shape="circle" />
            <Skeleton.Input style={{ width: 150 }} active />
          </Space>
          <Space>
            <Skeleton.Button active />
            <Skeleton.Button active />
          </Space>
        </Flex>
      </div>

      {/* Content Skeleton */}
      <Flex
        vertical
        flex={1}
        style={{ ...boxStyle, padding: '16px', overflow: 'hidden' }}
      >
        {/* Date Range Picker and Balance Skeleton */}
        <Flex justify="space-between" style={{ marginBottom: '16px' }}>
          <Skeleton.Input style={{ width: 250 }} active />
          <Space>
            <Skeleton.Input style={{ width: 80 }} active />
            <Skeleton.Input style={{ width: 80 }} active />
          </Space>
        </Flex>

        {/* Table Skeleton */}
        <Flex vertical flex={1} style={{ overflow: 'hidden' }}>
          <Skeleton active paragraph={{ rows: 8 }} />
        </Flex>

        {/* Date Range Picker and Balance Skeleton */}
        <Flex justify="space-between" style={{ marginBottom: '16px' }}>
          <Skeleton.Input style={{ width: 250 }} active />
          <Space>
            <Skeleton.Input style={{ width: 80 }} active />
            <Skeleton.Input style={{ width: 80 }} active />
          </Space>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageSkeleton;
