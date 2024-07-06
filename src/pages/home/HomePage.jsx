import React from 'react';
import { Col, Divider, Row } from 'antd';
import CardLink from '../../components/cardLink/CardLink';
import ReceivablePage from '../../pages/Receivable';


const HomePage = () => {
  return (
    <>
      <ReceivablePage />
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
