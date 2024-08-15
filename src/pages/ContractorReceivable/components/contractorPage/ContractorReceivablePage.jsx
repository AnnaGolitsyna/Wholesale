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
import { getDefaultPeriodForRangePicker } from '../../../../utils/dateUtils';
import { boxStyle } from '../../../../styles/boxStyle';

const ContractorReceivablePage = (props) => {
  const { id } = useParams();

  const [receivableData, setReceivableData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);
  const [datesPeriod, setDatesPeriod] = useState(
    getDefaultPeriodForRangePicker()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('datesPeriod', datesPeriod);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContractorReceivableData(id);
        setReceivableData(data);

        const transactionsData = await getTransactionsDataById(id);

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

  const getTransactionParameters = (receivable, transactionsData) => {
    let balance = receivable;

    const formattedData = transactionsData
      //?.filter((item) => item.name.value === id) // DELETE after fetching data will be completed
      ?.reduceRight((acc, item) => {
        const newItem = {
          ...item,
          key: item.id,
          balanceStart: formattedPriceToString(balance),
        };

        if (item.type === 'debet') {
          newItem.balanceEnd = formattedPriceToString(balance - item.sum);
          balance -= item.sum;
        } else if (item.type === 'credit') {
          newItem.balanceEnd = formattedPriceToString(balance + item.sum);
          balance += item.sum;
        }

        return [newItem, ...acc];
      }, []);
    const balanceEnd = formattedPriceToString(receivable);
    const balanceStart = formattedPriceToString(balance);

    return { balanceStart, balanceEnd, formattedData };
  };

  const { balanceStart, balanceEnd, formattedData } = getTransactionParameters(
    receivableData?.receivable,
    transactionsData
  );

  const contractorName = receivableData?.name;

  const handleDatesChange = (dates) => {
    setDatesPeriod(dates);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Flex vertical style={{ height: '100%', position: 'relative' }}>
      <PageHeader
        name={contractorName}
        balanceStart={balanceStart}
        balanceEnd={balanceEnd}
        period={datesPeriod}
        handleChange={handleDatesChange}
      />

      <TransactionsTable
        data={formattedData}
        balanceStart={balanceStart}
        balanceEnd={balanceEnd}
        period={datesPeriod}
      />

      <Flex style={{ marginBottom: '10px' }}>
        <Flex flex={1} style={boxStyle} vertical>
          <ClientInfoGroup name={contractorName} receivable={balanceEnd} />
        </Flex>

        <Flex
          flex={1}
          style={{ ...boxStyle, height: '200px' }}
          vertical
          align="center"
        >
          <Typography.Text>
            Динамика продаж за последние 6 месяцев
          </Typography.Text>
          <TransactionAreaChart data={data} />
        </Flex>
      </Flex>
    </Flex>
  );
};

ContractorReceivablePage.propTypes = {};

export { ContractorReceivablePage };
