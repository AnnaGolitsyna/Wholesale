import React from 'react';
import { Col, Divider, Row } from 'antd';

import { ReceivableChartPage } from '../../../Receivable/components/receivablePage/ReceivableChartPage';
import TwoLevelPieChart from '../charts/pieChart/TwoLevelPieChart';

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
           <ReceivableChartPage />
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
         <Col span={8}>3</Col>
         <Col span={8}>4</Col>
       </Row>
     </>
   );
};

DashboardPage.propTypes = {};

export { DashboardPage };
