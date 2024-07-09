import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Statistic, Table, Tag } from 'antd';
import ReceivableLayout from '../layout/ReceivableLayout';
import { ReactComponent as AllPurposeIcon } from '../../../../styles/icons/category/AllPurposeIcon.svg';
import { ReactComponent as BuyerIcon } from '../../../../styles/icons/category/BuyerIcon.svg';
import { ReactComponent as SupplierIcon } from '../../../../styles/icons/category/SupplierIcon.svg';
import { useGetContractorsListQuery } from '../../../Contractors';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getReceivableListRef } from '../../../Receivable';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const ReceivablePage = () => {
  const {
    data: contractorsData,
    isLoading: contractorsLoading,
    isError: contractorsError,
  } = useGetContractorsListQuery(true);

  const [receivablesData, receivablesLoading, receivablesError, snapshot] =
    useCollectionData(getReceivableListRef());

  const formattedData = useMemo(() => {
    if (!receivablesData || !contractorsData) return [];

    return receivablesData.map((item) => {
      const contractor = contractorsData.find(
        (el) => el.id === item.name.value
      );
      const receivable = item.debet - item.credit;

      return {
        ...item,
        receivable,
        name: contractor?.name ?? 'Unknown',
        category: contractor?.category ?? 'Uncategorized',
      };
    });
  }, [receivablesData, contractorsData]);

  const buyerData = useMemo(
    () => formattedData.filter((item) => item.category === 'buyer'),
    [formattedData]
  );
  const supplierData = useMemo(
    () => formattedData.filter((item) => item.category === 'supplier'),
    [formattedData]
  );
  const allPurposeData = useMemo(
    () => formattedData.filter((item) => item.category === 'all-purpose'),
    [formattedData]
  );

  const columns = [
    {
      title: 'Контрагент',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Долг',
      dataIndex: 'receivable',
      key: 'receivable',
      render: (receivable) => (
        <Tag color={receivable > 0 ? 'success' : 'warning'}>
          {formattedPriceToString(receivable)}
        </Tag>
      ),
    },
  ];

  const renderList = [
    {
      icon: <BuyerIcon />,
      title: 'Покупатели',
      component: (
        <Table
          dataSource={buyerData}
          columns={columns}
          pagination={false}
          scroll={{ y: 500 }}
          virtual
        />
      ),
    },
    {
      icon: <AllPurposeIcon />,
      title: 'Бартер',
      component: (
        <Table
          dataSource={allPurposeData}
          columns={columns}
          pagination={false}
          scroll={{ y: 500 }}
          virtual
        />
      ),
    },
    {
      icon: <SupplierIcon />,
      title: 'Поставщики',
      component: (
        <Table
          dataSource={supplierData}
          columns={columns}
          pagination={false}
          scroll={{ y: 500 }}
          virtual
        />
      ),
    },
  ];

  return <ReceivableLayout renderList={renderList} />;
};

ReceivablePage.propTypes = {};

export { ReceivablePage };
