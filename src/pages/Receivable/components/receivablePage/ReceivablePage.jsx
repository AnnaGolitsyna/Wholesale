import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import ReceivableLayout from '../layout/ReceivableLayout';
import { ReactComponent as AllPurposeIcon } from '../../../../styles/icons/category/AllPurposeIcon.svg';
import { ReactComponent as BuyerIcon } from '../../../../styles/icons/category/BuyerIcon.svg';
import { ReactComponent as SupplierIcon } from '../../../../styles/icons/category/SupplierIcon.svg';
//import {ReactComponent as ReceivableIcon} from '../../../../styles/icons/category/ReceivableIcon.svg';

const ReceivablePage = () => {
  const list = [
    {
      icon: <BuyerIcon />,
      title: 'Покупатели',
      component: <Table />,
    },
    {
      icon: <AllPurposeIcon />,
      title: 'Бартер',
      component: <Table />,
    },
    {
      icon: <SupplierIcon />,
      title: 'Поставщики',
      component: <Table />,
    },
  ];
  return <ReceivableLayout renderList={list} />;
};

ReceivablePage.propTypes = {};

export { ReceivablePage };
