import React from 'react';
import PropTypes from 'prop-types';
import { Result, Skeleton, Card } from 'antd';
import { ReactComponent as ChartSceletonIcon } from '../../../../../styles/icons/sceletons/ChartSceletonIcon.svg';
import { pulseAnimation, boxShadowStyle } from './style.js';

const ChartBox = ({ fetchData, ChartComponent, title }) => {
  const { formattedData, isLoading, isError } = fetchData();

  if (isError) {
    return <Result status="500" subTitle="Sorry, something went wrong." />;
  }

  const Component = isLoading ? (
    <Skeleton.Node
      active
      style={{
        minWidth: '25vw',
        minHeight: '25vh',
        alignSelf: 'center',
        animation:
          'pulse-fade-in 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) infinite',
      }}
    >
      <ChartSceletonIcon />
    </Skeleton.Node>
  ) : (
    <ChartComponent formattedData={formattedData} />
  );

  return (
    <>
      <style>{pulseAnimation}</style>
      <Card style={boxShadowStyle} title={title} size="small">
        {Component}
      </Card>
    </>
  );
};

ChartBox.propTypes = {
  fetchData: PropTypes.func.isRequired,
  ChartComponent: PropTypes.elementType.isRequired,
  title: PropTypes.string,
};

ChartBox.defaultProps = {
  title: 'Просмотр информации',
};

export default ChartBox;
