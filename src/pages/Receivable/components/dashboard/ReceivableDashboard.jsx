import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import ReceivableHeader from '../header/ReceivableHeader';
import DataDisplayCard from '../dataDisplayCard/DataDisplayCard';
import { categoryContractor } from '../../../../constants/categoryContractor';
import { calculateSpan } from '../../utils/calculateSpan';

const ReceivableDashboard = ({ data, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (value) => {
    setSearchTerm(value);
    const lowercasedValue = value.toLowerCase().trim();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const columnSpan = calculateSpan(categoryContractor.length);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReceivableHeader onChange={handleChange} value={searchTerm} />

      <Row justify="space-around" style={{ flex: 1 }}>
        {categoryContractor.map((category) => {
          const categoryData = filteredData.filter(
            (item) => item.category === category.value
          );
          return (
            <Col key={category.value} span={columnSpan}>
              <DataDisplayCard
                icon={category.icon}
                title={category.label}
                data={categoryData}
                isLoading={isLoading}
                color={category.color}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

ReceivableDashboard.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ReceivableDashboard;
