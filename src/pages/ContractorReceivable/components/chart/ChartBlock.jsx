import React from 'react'
import PropTypes from 'prop-types'
import { Col, Divider, Row } from 'antd';
import ChartBox from '../../../../components/chart/chartBox/ChartBox';
import TransactionAreaChart from '../chart/TransactionAreaChart';
import { useGetChartData } from '../../hook/useGetChartData';

const ChartBlock = ({ contractorId, datesPeriod }) => {
     const { formattedData, loading, error } = useGetChartData(
       contractorId,
       datesPeriod
     );

  return (
    <>
      <Row>
        <Col span={24}>
          <ChartBox
            ChartComponent={TransactionAreaChart}
            data={formattedData}
            isLoading={loading}
            isError={error}
            title="Динамика продаж за последние 6 месяцев"
            //type={OPERATION_TYPES.DEBET}
          />
        </Col>
      </Row>
      <Divider />
      <Row justify="space-around">
        <Col span={11}>Pie1</Col>
        <Col span={11}>Pie2</Col>
      </Row>
    </>
  );
};

ChartBlock.propTypes = {}

export default ChartBlock