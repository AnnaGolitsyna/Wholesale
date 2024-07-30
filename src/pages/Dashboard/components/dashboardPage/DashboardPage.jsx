import React from 'react';
import { Col, Divider, Row } from 'antd';
import ChartBox from '../charts/chartBox/ChartBox';
import ReceivablesChart from '../charts/receivableChart/ReceivablesChart';
import { useGetReceivableData } from '../../../Receivable';

// Redone all charts for your needs
import TwoLevelPieChart from '../charts/pieChart/TwoLevelPieChart';
import TwoAreaChart from '../charts/areaChart/TwoAreaChart';
import OnePieChart from '../charts/pieChart/PieChart';

const DashboardPage = (props) => {

  return (
    <>
      <Row justify="space-around">
        <Col span={10}>
          <ChartBox
            fetchData={useGetReceivableData}
            ChartComponent={ReceivablesChart}
            title="Дебиторская задолженность"
          />
        </Col>
        <Col span={10}>
          <ChartBox
            fetchData={useGetReceivableData}
            ChartComponent={ReceivablesChart} // <TwoLevelPieChart />
          />
        </Col>
      </Row>
      <Divider />
      <Row justify="space-around">
        <Col span={10}>
          <ChartBox
            fetchData={useGetReceivableData}
            ChartComponent={ReceivablesChart} // <TwoAreaChart />
          />
        </Col>
        <Col span={10}>
          <ChartBox
            fetchData={useGetReceivableData}
            ChartComponent={ReceivablesChart} // <OnePieChart />
          />
        </Col>
      </Row>
    </>
  );
};

DashboardPage.propTypes = {};

export { DashboardPage };
