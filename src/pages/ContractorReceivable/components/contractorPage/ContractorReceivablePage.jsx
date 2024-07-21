import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, NavLink } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Flex,
  Space,
  Typography,
  Content,
  Row,
  Col,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import TwoAreaChart from '../chart/TwoAreaChart';
import {
  getContractorReceivableData,
  getTransactionsDataById,
} from '../../api/operations';

const ContractorReceivablePage = (props) => {
  const { id } = useParams();

const [receivableData, setReceivableData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getContractorReceivableData(id);
     const transactionsData = await getTransactionsDataById(id);
     console.log('Transactions:', transactionsData);
      setReceivableData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);

console.log('receivableData', receivableData);

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

  const boxStyle = {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    padding: '20px',
  };

  return (
    <Flex vertical style={{ height: '100%' }}>
      <NavLink
        to={'/receivables'}
        style={{ textAlign: 'right', marginBottom: '5px' }}
      >
        <EyeOutlined style={{ color: '#fff1e0', marginRight: '5px' }} />
        <Typography.Text code>Показать всех контрагентов</Typography.Text>
      </NavLink>
      <Flex style={{ flex: '2', minHeight: '35%' }}>
        <Flex flex={1} style={boxStyle} vertical>
          <Typography.Text strong>{receivableData?.name}</Typography.Text>
          <DatePicker />
        </Flex>
        <Flex flex={1} style={boxStyle}>
          <TwoAreaChart />
        </Flex>
      </Flex>

      <Flex style={{ flex: '3', minHeight: '60%', ...boxStyle }}>
        Bottom Content (60% of total height, 100% width)
      </Flex>
    </Flex>
  );
};

ContractorReceivablePage.propTypes = {};

export { ContractorReceivablePage };
