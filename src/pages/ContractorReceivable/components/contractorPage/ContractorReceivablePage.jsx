import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, NavLink } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Flex,
  Space,
  Typography,
  Row,
  Col,
  Card,
  Layout,
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
import PageHeader from '../header/PageHeader';
import { data } from '../chart/areaChartData';
import { formattedPriceToString } from '../../../../utils/priceUtils';
import { boxStyle } from '../../../../styles/boxStyle';


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
          // balance: Number((balance - item.sum).toFixed(2)),
          balanceStart: formattedPriceToString(balance),
          // balanceEnd: balance - item.sum,
        };
        balance -= item.sum;

        return [...acc, newItem];
      } else if (item.type === 'credit') {
        const newItem = {
          ...item,
          key: item.id,
          // balance: Number((balance + item.sum).toFixed(2)),
          balanceStart: formattedPriceToString(balance),
          // balanceEnd: balance + item.sum,
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

  const formattedReceivable = formattedPriceToString(
    receivableData?.receivable
  );

  return (
    <Flex vertical style={{ height: '100%', position: 'relative' }}>
      {/* <Flex
        justify="space-between"
        style={{ padding: '5px', position: 'sticky', top: 66,  backgroundColor: 'white' }}
      >
        <BackNavLink path={'/receivables'} text={'К списку контрагентов'} />
        <Button>Print</Button>
      </Flex> */}
      <PageHeader name={receivableData?.name} />

      <Flex style={{ marginBottom: '10px' }}>
        <Flex flex={1} style={boxStyle} vertical>
          <ClientInfoGroup
            name={receivableData?.name}
            receivable={formattedReceivable}
          />
        </Flex>

        <Flex flex={1} style={boxStyle} vertical align="center">
          <Typography.Text>
            Динамика продаж за последние 6 месяцев
          </Typography.Text>
          <TransactionAreaChart data={data} />
        </Flex>
      </Flex>
      <TransactionsTable data={test} balanceEnd={formattedReceivable} />
    </Flex>
  );
};

ContractorReceivablePage.propTypes = {};

export { ContractorReceivablePage };
