import React from 'react';
import PropTypes from 'prop-types';
import ReceivableLayout from '../layout/ReceivableLayout';
import { ReactComponent as AllPurposeIcon } from '../../../../styles/icons/category/AllPurposeIcon.svg';
import { ReactComponent as BuyerIcon } from '../../../../styles/icons/category/BuyerIcon.svg';
import {ReactComponent as SupplierIcon} from '../../../../styles/icons/category/SupplierIcon.svg';
//import {ReactComponent as ReceivableIcon} from '../../../../styles/icons/category/ReceivableIcon.svg';

const ReceivablePage = () => {
  return <ReceivableLayout firstIcon={<BuyerIcon />} secondIcon={<AllPurposeIcon />} thirdIcon={<SupplierIcon />} />;
};

ReceivablePage.propTypes = {};

export { ReceivablePage };
