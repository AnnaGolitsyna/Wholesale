import React from 'react';
import { Col, Divider, Row } from 'antd';
import ChartBox from '../../../../components/chart/chartBox/ChartBox';
import ReceivablesChart from '../charts/receivableChart/ReceivablesChart';
import PieReceivableChart from '../charts/pieChart/PieReceivableChart';
import { OPERATION_TYPES } from '../../../../constants/operationTypes';
import { useGetFormattedData } from '../../hook/useGetFormattedData';

const DashboardPage = () => {
  const { debetData, creditData, isLoading, isError } = useGetFormattedData();

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
