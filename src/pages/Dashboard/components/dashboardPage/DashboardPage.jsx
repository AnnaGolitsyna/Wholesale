import React from 'react';
import { Col, Divider, Row } from 'antd';
import ChartBox from '../charts/chartBox/ChartBox';
import ReceivablesChart from '../charts/receivableChart/ReceivablesChart';
import PieReceivableChart from '../charts/pieChart/PieReceivableChart';
import { useGetReceivableData } from '../../../Receivable';
import { OPERATION_TYPES } from '../../../../constants/operationTypes';

// Redone all charts for your needs
import TwoLevelPieChart from '../charts/pieChart/TwoLevelPieChart';
import TwoAreaChart from '../charts/areaChart/TwoAreaChart';
import OnePieChart from '../charts/pieChart/PieReceivableChart';

const DashboardPage = (props) => {
  const { formattedData, isLoading, isError } = useGetReceivableData();

  const debetData = formattedData
    .filter((item) => item.receivable > 0)
    .sort((a, b) => b.count - a.count);
  const creditData = formattedData
    .filter((item) => item.receivable < 0)
    .sort((a, b) => b.count - a.count);
  // console.log('formattedData', formattedData, debetData);

  return (
    <>
      <Row justify="space-around">
        <Col span={14}>
          <ChartBox
            ChartComponent={ReceivablesChart}
            data={debetData}
            isLoading={isLoading}
            isError={isError}
            title="Дебиторская задолженность"
            type={OPERATION_TYPES.DEBET}
          />
        </Col>
        <Col span={8}>
          <ChartBox
            ChartComponent={PieReceivableChart}
            data={creditData}
            isLoading={isLoading}
            isError={isError}
            title="Распределении доли кредиторской задолженности"
            type={OPERATION_TYPES.CREDIT}
          />
        </Col>
      </Row>
      <Divider />
      <Row justify="space-around">
        <Col span={8}>
          <ChartBox
            ChartComponent={PieReceivableChart}
            data={debetData}
            isLoading={isLoading}
            isError={isError}
            title="Распределении доли дебиторской задолженности"
            type={OPERATION_TYPES.DEBET}
          />
        </Col>
        <Col span={14}>
          <ChartBox
            ChartComponent={ReceivablesChart}
            data={creditData}
            isLoading={isLoading}
            isError={isError}
            title="Кредиторская задолженность"
            type={OPERATION_TYPES.CREDIT}
          />
        </Col>
      </Row>
    </>
  );
};

DashboardPage.propTypes = {};

export { DashboardPage };
