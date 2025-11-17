import React from 'react';
import PropTypes from 'prop-types';
import DynamicTable from './DynamicTable';
import { relatedCompaniesColumns } from '../../utils/relatedCompaniesColumns';

/**
 * Wrapper for RelatedCompanies table
 * Maintains backward compatibility with existing code
 */
const RelatedCompaniesTable = ({
  name = 'relatedCompanies',
  disabled = false,
}) => {
  const sortByActive = (a, b) => b.active - a.active;

  return (
    <DynamicTable
      name={name}
      columns={relatedCompaniesColumns}
      emptyText="Связанных компаний нет"
      sortData={sortByActive}
      disabled={disabled}
    />
  );
};

RelatedCompaniesTable.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default RelatedCompaniesTable;
