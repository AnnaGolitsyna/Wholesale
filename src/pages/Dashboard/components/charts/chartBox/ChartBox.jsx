import React from 'react';
import PropTypes from 'prop-types';
import { Result, Skeleton, Card } from 'antd';
import { ReactComponent as ChartSceletonIcon } from '../../../../../styles/icons/sceletons/ChartSceletonIcon.svg';
import { pulseAnimation, boxShadowStyle } from './style.js';

const ChartBox = ({
  ChartComponent,
  data,
  isLoading,
  isError,
  title,
  type,
}) => {
  if (isError) {
    return <Result status="500" subTitle="Sorry, something went wrong." />;
  }

  const chartContainerStyle = {
    width: '100%',
    height: 'calc(31vh - 5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const Component = isLoading ? (
    <Skeleton.Node
      active
      style={{
        width: '100%',
        height: '100%',
        animation:
          'pulse-fade-in 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) infinite',
      }}
    >
      <ChartSceletonIcon />
    </Skeleton.Node>
  ) : (
    <ChartComponent formattedData={data} type={type} />
  );

  return (
    <>
      <style>{pulseAnimation}</style>
      <Card
        style={boxShadowStyle}
        title={title}
        size="small"

      >
        <div style={chartContainerStyle}>{Component}</div>
      </Card>

    </>
  );
};

ChartBox.propTypes = {
  ChartComponent: PropTypes.elementType.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
};

ChartBox.defaultProps = {
  title: 'Просмотр информации',
};

export default ChartBox;
