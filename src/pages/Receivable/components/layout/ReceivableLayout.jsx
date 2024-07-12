import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Space } from 'antd';
import { getTodayFullFormattedDate } from '../../../../utils/dateUtils';

const { Title, Text } = Typography;

const ReceivableLayout = ({ renderList }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Title level={3} style={{ textAlign: 'center', margin: '0 0 20px 0' }}>
        {`Дебиторская задолженность на ${getTodayFullFormattedDate()}`}
      </Title>


      <Row gutter={[16, 16]} justify="space-around" style={{ flex: 1 }}>
        {renderList.map(({ icon, title, component }, index) => (
          <Col key={title} xs={24} sm={12} md={8} lg={6}>
            <Space
              direction="vertical"
              style={{ width: '100%' }}
              align="center"
            >
              {icon}
              <Text strong>{title}</Text>
              {component}
            </Space>
          </Col>
        ))}
      </Row>
    </div>
  );
};

ReceivableLayout.propTypes = {
  renderList: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      component: PropTypes.node,
    })
  ).isRequired,
};

export default ReceivableLayout;

