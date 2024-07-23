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
  Card,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import TransactionAreaChart from '../chart/TransactionAreaChart';
import {
  getContractorReceivableData,
  getTransactionsDataById,
} from '../../api/operations';
import TransactionsTable from '../table/TransactionsTable';
import ClientInfoGroup from '../clientInfoGroup/ClientInfoGroup';
import BackNavLink from '../../../../components/link/BackNavLink';
import { data } from '../chart/areaChartData';

const ContractorReceivablePage = (props) => {
  const { id } = useParams();

  const [receivableData, setReceivableData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContractorReceivableData(id);
        setReceivableData(data);

        const transactionsData = await getTransactionsDataById();
        console.log('Transactions data:', transactionsData);
        setTransactionsData(transactionsData);

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
      <Flex justify="space-between" style={{ marginBottom: '5px' }}>
        <BackNavLink path={'/receivables'} text={'К списку контрагентов'} />
        <Button>Print</Button>
      </Flex>
      <Flex style={{ flex: '2', minHeight: '35%' }}>
        <Flex flex={1} style={boxStyle} vertical>
          <ClientInfoGroup
            name={receivableData?.name}
            receivable={receivableData?.sum}
          />
        </Flex>

        <Flex flex={1} style={boxStyle} vertical align="center">
          <Typography.Text>
            Динамика продаж за последние 6 месяцев
          </Typography.Text>
          <TransactionAreaChart data={data} />
        </Flex>
      </Flex>

      <Flex style={{ flex: '3', minHeight: '60%', ...boxStyle }}>
        <TransactionsTable data={transactionsData} />
      </Flex>
    </Flex>
  );
};

ContractorReceivablePage.propTypes = {};

export { ContractorReceivablePage };
