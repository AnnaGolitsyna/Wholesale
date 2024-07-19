import React from 'react';
import PropTypes from 'prop-types';
import { Result, Skeleton } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';
import {ReactComponent as ChartSceletonIcon} from '../../../../../styles/icons/sceletons/ChartSceletonIcon.svg';

const ChartBox = ({ fetchData, ChartComponent }) => {
  const { formattedData, isLoading, isError } = fetchData();

  if (isError) {
    return <Result status="500" subTitle="Sorry, something went wrong." />;
  }

  return (
    <>
      {isLoading ? (
        <Skeleton.Node
          active
          style={{ minWidth: '25vw', minHeight: '25vh', alignSelf: 'center' }}
        >
          {/* <DotChartOutlined
            style={{
              fontSize: 100,
              color: '#bfbfbf',
            }}
          /> */}
          <ChartSceletonIcon />
        </Skeleton.Node>
      ) : (
        <ChartComponent formattedData={formattedData} />
      )}
    </>
  );
};

ChartBox.propTypes = {
  fetchData: PropTypes.func.isRequired,
  ChartComponent: PropTypes.elementType.isRequired,
};

export default ChartBox;
