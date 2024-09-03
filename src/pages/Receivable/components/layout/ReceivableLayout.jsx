import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Space, Card, Divider } from 'antd';
import { getTodayFullFormattedDate } from '../../../../utils/dateUtils';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { boxStyle } from '../../../../styles/boxStyle';
import ReceivableHeader from '../header/ReceivableHeader';

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
      <ReceivableHeader onChange={handleChange} />

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
