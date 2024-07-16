import React from 'react';
import { Col, Divider, Row } from 'antd';
import CardLink from '../../components/cardLink/CardLink';
import {ReceivableChartPage} from '../../pages/Receivable/components/receivablePage/ReceivableChartPage';


const HomePage = () => {
  return (
    <>
      <ReceivableChartPage />

      {/* <Row
        justify="space-around"
        gutter={{
          md: 32,
          lg: 40,
        }}
      >
        <Col span={10}>
          <CardLink
            alt="clients"
            src="/clients.svg"
            title="Работа с клиентами"
            description="Создай новую расходную накладную"
          />
        </Col>
        <Col span={10}>
          <CardLink
            alt="suppliers"
            src="/suppliers.svg"
            title="Работа с поставщиками"
            description="Создай новую приходную накладную"
          />
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
        <Col span={8}>
          <CardLink
            alt="money"
            src="/money.svg"
            title="Кассовые операции"
            description="Внеси деньги в кассу"
          />
        </Col>
        <Col span={8}>
          <CardLink
            alt="reports"
            src="/reports.svg"
            title="Узнай задолженность"
            description="Сделай сверку с контрагентами"
          />
        </Col>
      </Row> */}
    </>
  );
};

export default HomePage;


//  <div className="w-full h-96 border border-gray-300 p-4">
//    <h2 className="text-xl font-bold mb-4">Top 10 Receivables</h2>
//    <pre className="text-xs overflow-auto max-h-40 mb-4">
//      {JSON.stringify(chartData, null, 2)}
//    </pre>
//    {chartData.length > 0 ? (
//      <ResponsiveContainer width="50%" height="50%">
//        <BarChart
//          data={chartData}
//          margin={{
//            top: 20,
//            right: 30,
//            left: 20,
//            bottom: 5,
//          }}
//        >
//          <CartesianGrid strokeDasharray="3 3" />
//          <XAxis dataKey="name" />
//          <YAxis />
//          <Tooltip />
//          <Legend />
//          <Bar dataKey="receivable" fill="#8884d8" />
//        </BarChart>
//      </ResponsiveContainer>
//    ) : (
//      <div>
//        Chart should render here. If you see this, there might be an issue with
//        the chart library or data.
//      </div>
//    )}
//  </div>;
