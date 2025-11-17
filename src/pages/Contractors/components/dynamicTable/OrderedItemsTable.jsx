import React from 'react';
import PropTypes from 'prop-types';
import DynamicTable from './DynamicTable';
import { orderedItemsColumns } from '../../utils/orderedItemsColumns';

/**
 * Wrapper for Ordered Items table
 * Used in contractor forms and order processing
 */
const OrderedItemsTable = ({ name = 'listOrderedItems', disabled = false }) => {
  return (
    <DynamicTable
      name={name}
      columns={orderedItemsColumns}
      emptyText="Список заказанных товаров пуст"
      disabled={disabled}
      tableProps={{
        // Add any specific table props for ordered items
        scroll: { x: true },
      }}
    />
  );
};

OrderedItemsTable.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export {OrderedItemsTable};
