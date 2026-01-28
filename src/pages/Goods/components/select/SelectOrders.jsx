import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { useFirebaseProductsList } from '../../../OrderProcessing/api/operations';

const SelectOrders = ({ form, data }) => {
  const { data: ordersList, isLoading } = useFirebaseProductsList();

  const options = useMemo(() => {
    if (!ordersList) return [];

    return [...ordersList]
      .sort((a, b) => {
        const aLabel = (a.label || a.name || '').toLowerCase();
        const bLabel = (b.label || b.name || '').toLowerCase();
        return aLabel.localeCompare(bLabel);
      })
      .map((item) => ({
        value: item.value || item.id,
        label: item.label || item.name || item.value,
      }));
  }, [ordersList]);

  const onChange = ({ value, label }) => {
    const selectedOrder = { value, label };
    console.log('select', selectedOrder);
    
    form.setFieldsValue({ inOrders: selectedOrder });
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      defaultValue={data?.inOrders}
      placeholder="выберите заказ"
      options={options}
      onChange={onChange}
      showSearch
      filterOption={filterOption}
      labelInValue
      loading={isLoading}
      allowClear
    />
  );
};

SelectOrders.propTypes = {
  form: PropTypes.object.isRequired,
  data: PropTypes.object,
};

export default SelectOrders;
