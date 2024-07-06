import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

const ReceivableLayout = ({firstIcon, secondIcon, thirdIcon}) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Title Section */}
      <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
        Your Title Here
      </Title>

      {/* Main Content */}
      <Row gutter={[16, 16]} style={{ flex: 1 }}>
        {/* First Section (now approximately 25% of remaining space) */}
        <Col span={24} style={{ height: '30%' }}>
          <div style={{ height: '100%', border: '1px solid #d9d9d9' }}>
            <Row gutter={16} style={{ height: '100%' }}>
              <Col span={8}>
                <div
                  style={{
                    height: '100%',
                    border: '1px solid #1890ff',
                    padding: '8px',
                  }}
                >
                  {firstIcon}
                </div>
              </Col>
              <Col span={8}>
                <div
                  style={{
                    height: '100%',
                    border: '1px solid #1890ff',
                    padding: '8px',
                  }}
                >
                 {secondIcon}
                </div>
              </Col>
              <Col span={8} >
                {/* <div
                  style={{
                    height: '100%',
                    border: '1px solid #1890ff',
                    padding: '8px',
                  }}
                >
                  {thirdIcon}
                </div> */}
                {thirdIcon}
              </Col>
            </Row>
          </div>
        </Col>

        {/* Second Section (now approximately 70% of remaining space) */}
        <Col span={24} style={{ height: '70%' }}>
          <div style={{ height: '100%', border: '1px solid #d9d9d9' }}>
            <Row gutter={16} style={{ height: '100%' }}>
              <Col span={8}>
                <div
                  style={{
                    height: '100%',
                    border: '1px solid #52c41a',
                    padding: '8px',
                  }}
                >
                  Section 2-1
                </div>
              </Col>
              <Col span={8}>
                <div
                  style={{
                    height: '100%',
                    border: '1px solid #52c41a',
                    padding: '8px',
                  }}
                >
                  Section 2-2
                </div>
              </Col>
              <Col span={8}>
                <div
                  style={{
                    height: '100%',
                    border: '1px solid #52c41a',
                    padding: '8px',
                  }}
                >
                  Section 2-3
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

ReceivableLayout.propTypes = {}

export default ReceivableLayout