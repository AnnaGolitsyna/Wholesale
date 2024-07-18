import React from 'react';
import { Col, Divider, Row, Typography } from 'antd';
import TwoLevelPieChart from '../charts/pieChart/TwoLevelPieChart';
import TwoAreaChart from '../charts/areaChart/TwoAreaChart';
import OnePieChart from '../charts/pieChart/PieChart';

// Redone all charts using ChartBox
import ChartBox from '../charts/chartBox/ChartBox';
import { useGetReceivableData } from '../../../Receivable';
import ReceivablesChart from '../charts/receivableChart/ReceivablesChart';

const DashboardPage = (props) => {
  return (
    <>
      <Row
        justify="space-around"
        gutter={{
          md: 32,
          lg: 40,
        }}
      >
        <Col span={10}>
          <Typography.Title level={5} style={{ textAlign: 'center' }} >Дебиторская задолженность</Typography.Title>
          <ChartBox
            fetchData={useGetReceivableData}
            ChartComponent={ReceivablesChart}
          />
        </Col>
        <Col span={10}>
          <TwoLevelPieChart />
        </Col>
      </Row>
      <Divider />
      <Row
        justify="space-evenly"
        gutter={{
          md: 32,
          lg: 40,
        }}
      >
        <Col span={10}>
          <TwoAreaChart />
        </Col>
        <Col span={10}>
          <OnePieChart />
        </Col>
      </Row>
    </>
  );
};

DashboardPage.propTypes = {};

export { DashboardPage };
