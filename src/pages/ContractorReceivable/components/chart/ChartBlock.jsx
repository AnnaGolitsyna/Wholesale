import React from 'react'
import PropTypes from 'prop-types'
import { Col, Divider, Row } from 'antd';
import ChartBox from '../../../../components/chart/chartBox/ChartBox';
import TransactionAreaChart from '../chart/TransactionAreaChart';
import TypeSharePieChart from '../chart/TypeSharePieChart';
import MonthRadarChart from '../chart/MonthRadarChart';
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
      <Row justify="space-between">
        <Col span={11}>
          <ChartBox
            ChartComponent={TypeSharePieChart}
            data={formattedData}
            isLoading={loading}
            isError={error}
            title="Доля по типу операций"
            //type={OPERATION_TYPES.DEBET}
          />
        </Col>
        <Col span={11}>
          <ChartBox
            ChartComponent={MonthRadarChart}
            data={formattedData}
            isLoading={loading}
            isError={error}
            title="Динамика по типу операций"
            //type={OPERATION_TYPES.DEBET}
          />
        </Col>
      </Row>
    </>
  );
};

ChartBlock.propTypes = {}

export default ChartBlock