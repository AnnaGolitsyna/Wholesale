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
        setTransactionsData(
          transactionsData.sort(
            (a, b) =>
              a.date.localeCompare(b.date) ||
              a.docNumber.localeCompare(b.docNumber)
          )
        );

        setReceivableData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  let balance = receivableData?.receivable;

  const test = transactionsData
    ?.filter((item) => item.name.value === id)
    .reduceRight((acc, item) => {
      if (item.type === 'debet') {
        const newItem = {
          ...item,
          key: item.id,
          balance: Number((balance - item.sum).toFixed(2)),
        };
        balance -= item.sum;
        return [...acc, newItem];
      } else if (item.type === 'credit') {
        const newItem = {
          ...item,
          key: item.id,
          balance: Number((balance + item.sum).toFixed(2)),
        };
        balance += item.sum;
        return [...acc, newItem];
      }
    }, [])
    .reverse();
  // .sort(
  //   (a, b) =>
  //     b.date.localeCompare(a.date) || b.docNumber.localeCompare(a.docNumber)
  // );

  console.log('receivableData', receivableData, transactionsData, test);

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
            receivable={receivableData?.receivable}
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
        <TransactionsTable
          //isLoading={loading}
          data={test}
          balanceEnd={receivableData?.receivable}
        />
      </Flex>
    </Flex>
  );
};

ContractorReceivablePage.propTypes = {};

export { ContractorReceivablePage };
