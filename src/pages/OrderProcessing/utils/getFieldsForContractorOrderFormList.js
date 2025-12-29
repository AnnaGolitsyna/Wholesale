import { Form } from 'antd';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';
import { OrderedItemsTable } from '../../Contractors';
import { AddOnModal } from '../../../features/modifyingItems';
import TransferCard from '../components/cards/TransferCard';
import ResponsiveTitleSection from '../components/ResponsiveTitleSection';

/**
 * Returns form fields for editing contractor ordered items
 * Used in OrderProcessing page for full editing capability
 */
const getFieldsForContractorOrderFormList = (form, actionType, data) => {
  return [
    {
      name: 'id',
      keyname: 'id',
      hidden: true,
      component: <Form.Item name="id" noStyle />,
    },
    {
      name: '_isBarterMode',
      keyname: '_isBarterMode',
      hidden: true,
      component: <Form.Item name="_isBarterMode" noStyle />,
    },
    {
      keyname: 'responsiveTitleSection',
      component: <ResponsiveTitleSection actionType={actionType} data={data} />,
    },
    {
      name: 'listOrderedItems',
      keyname: 'listOrderedItems',
      label: 'Список заказанных товаров',
      component: <OrderedItemsTable name="listOrderedItems" />,
    },
    // ✅ NEW: Transfer Card Section with DatePicker and Button
    {
      keyname: 'transferSection',
      component: (
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.listOrderedItems !== currentValues.listOrderedItems ||
            prevValues.filteredItemsKeys !== currentValues.filteredItemsKeys
          }
        >
          {({ getFieldValue }) => {
            if (!data?.category) {
              return null;
            }
            // Get filtered items keys from form (set by OrderedItemsTable)
            const filteredKeys = getFieldValue('filteredItemsKeys') || [];
            const allItems = getFieldValue('listOrderedItems') || [];

            // Get the actual filtered items data and normalize count to Number
            // ✅ Only include the fields needed for transfer (no extra fields like inBox, isBarter, etc.)
            const filteredItems = allItems
              .filter((item) => filteredKeys.includes(item.key))
              .map((item) => ({
                key: item.key,
                value: item.value,
                label: item.label,
                scedule: item.scedule,
                // ✅ Ensure count is always a Number
                count:
                  typeof item.count === 'number'
                    ? item.count
                    : parseInt(item.count, 10) || 0,
              }));

            return (
              <TransferCard
                filteredItems={filteredItems}
                contractorData={{
                  id: data?.id,
                  name: data?.name,
                  fullName: data?.fullName,
                }}
              />
            );
          }}
        </Form.Item>
      ),
    },
    {
      keyname: 'addNewItem',
      component: (
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.listOrderedItems !== currentValues.listOrderedItems
          }
        >
          {({ getFieldValue }) => {
            const currentItems = getFieldValue('listOrderedItems') || [];

            return (
              <AddOnModal
                data={{ listOrderedItems: currentItems }}
                typeData={FORM_TYPES.CONTRACTOR_ORDER_ADDITIONAL}
                actionType={FORM_ACTIONS.CREATE}
                disabled={actionType === FORM_ACTIONS.CREATE}
                modalWidth="100%"
              />
            );
          }}
        </Form.Item>
      ),
    },
  ];
};

export { getFieldsForContractorOrderFormList };
