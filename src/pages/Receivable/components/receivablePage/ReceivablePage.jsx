import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Result } from 'antd';
import ReceivableLayout from '../layout/ReceivableLayout';
import { ReactComponent as AllPurposeIcon } from '../../../../styles/icons/category/AllPurposeIcon.svg';
import { ReactComponent as BuyerIcon } from '../../../../styles/icons/category/BuyerIcon.svg';
import { ReactComponent as SupplierIcon } from '../../../../styles/icons/category/SupplierIcon.svg';
import { useGetContractorsListQuery } from '../../../Contractors';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getReceivableListRef } from '../../../Receivable';
import ReceaivableTable from '../table/ReceaivableTable';

const ReceivablePage = () => {
  const {
    data: contractorsData,
    isLoading: contractorsLoading,
    isError: contractorsError,
  } = useGetContractorsListQuery(true);

  const [receivablesData, receivablesLoading, receivablesError] =
    useCollectionData(getReceivableListRef());

  const formattedData = useMemo(() => {
    if (!contractorsData || !receivablesData) return [];

    return contractorsData
      .map((contractor) => {
        const receivableItem = receivablesData.find((item) => {
          return (
            item.name.value === contractor.id ||
            contractor.relatedCompanies.some(
              (company) => company.id === item.name.value
            )
          );
        });

        if (!receivableItem) return null;

        const relatedCompany = contractor.relatedCompanies.find(
          (company) => company.id === receivableItem.name.value
        );

        const receivable =
          receivableItem?.debet - receivableItem?.credit || '?';

        return {
          ...contractor,
          receivable,
          id: relatedCompany ? relatedCompany.id : contractor.id,
          name: relatedCompany ? relatedCompany.name : contractor.name,
        };
      })
      .filter(Boolean);
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

  const renderList = [
    {
      icon: <BuyerIcon />,
      title: 'Покупатели',
      component: (
        <ReceaivableTable
          data={buyerData}
          isLoading={contractorsLoading || receivablesLoading}
        />
      ),
    },
    {
      icon: <AllPurposeIcon />,
      title: 'Бартер',
      component: (
        <ReceaivableTable
          data={allPurposeData}
          isLoading={contractorsLoading || receivablesLoading}
        />
      ),
    },
    {
      icon: <SupplierIcon />,
      title: 'Поставщики',
      component: (
        <ReceaivableTable
          data={supplierData}
          isLoading={contractorsLoading || receivablesLoading}
        />
      ),
    },
  ];

  const isError = contractorsError || receivablesError;

  return (
    <>
      <ReceivableLayout renderList={renderList} />;
      {isError && (
        <Result status="500" subTitle="Sorry, something went wrong." />
      )}
    </>
  );
};

ReceivablePage.propTypes = {};

export { ReceivablePage };
