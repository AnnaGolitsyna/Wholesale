import React from 'react';
import PropTypes from 'prop-types';
import PriceListHeader from '../header/PriceListHeader';
import TableToPrint from '../table/TableToPrint';

const PriceListContent = ({ data, columns, title }) => {
  const { productList } = data;
  return (
    <>
      <PriceListHeader title={title} />
      <TableToPrint data={productList} columns={columns} />
    </>
  );
};

PriceListContent.propTypes = {
  data: PropTypes.shape({
    productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default PriceListContent;
