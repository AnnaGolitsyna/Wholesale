import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Space, Card, Divider } from 'antd';
import { getTodayFullFormattedDate } from '../../../../utils/dateUtils';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { boxStyle } from '../../../../styles/boxStyle';

const { Title, Text } = Typography;

const ReceivableLayout = ({ renderList }) => {
  const [data, setData] = useState(renderList);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    const filteredList = renderList.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    })
    setData(filteredList);
  };
  console.log(data);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Row>
        <Col span={16}>
          <Title
            level={3}
            style={{ textAlign: 'center', margin: '0 0 20px 0', ...boxStyle }}
          >
            {`Дебиторская задолженность на ${getTodayFullFormattedDate()}`}
          </Title>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <SearchInput
            onChange={handleChange}
            placeholder="Поиск по договору"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="space-around" style={{ flex: 1 }}>
        {renderList.map(({ icon, title, component }, index) => (
          <Col key={title} xs={24} sm={12} md={8} lg={6}>
            <Space
              direction="vertical"
              style={{ width: '100%', marginBottom: 10, ...boxStyle }}
              align="center"
            >
              {icon}
              <Text strong>{title}</Text>
            </Space>
            {component}
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
