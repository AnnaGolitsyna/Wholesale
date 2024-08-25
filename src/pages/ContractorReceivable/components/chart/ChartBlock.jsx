import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row } from 'antd';
import ChartBox from '../../../../components/chart/chartBox/ChartBox';
import TransactionAreaChart from '../chart/TransactionAreaChart';
import TypeSharePieChart from '../chart/TypeSharePieChart';
import MonthRadarChart from '../chart/MonthRadarChart';
import { useGetChartData } from '../../hook/useGetChartData';
import { ACTION_TYPES } from '../../api/redusers/contractorReceivableReducer';

const ChartBlock = ({ contractorId, datesPeriod, dispatch }) => {
  const { formattedData, loading, error, colorsByType } = useGetChartData(
    contractorId,
    datesPeriod
  );
  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_TOGGLE_BTN_DISABLED, payload: loading });
  }, [loading, dispatch]);

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
            colorsByType={colorsByType}
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
            colorsByType={colorsByType}
          />
        </Col>
        <Col span={11}>
          <ChartBox
            ChartComponent={MonthRadarChart}
            data={formattedData}
            isLoading={loading}
            isError={error}
            title="Динамика по типу операций"
            colorsByType={colorsByType}
          />
        </Col>
      </Row>
    </>
  );
};

ChartBlock.propTypes = {
  contractorId: PropTypes.string.isRequired,
  datesPeriod: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ChartBlock;
