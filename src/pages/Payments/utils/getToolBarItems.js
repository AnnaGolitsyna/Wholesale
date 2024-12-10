import { Typography, DatePicker } from 'antd';
import { monthFormat, getThisMonth } from '../../../utils/dateUtils';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';
import { ReactComponent as CoinIcon } from '../../../styles/icons/money/CoinIcon.svg';
import { ReactComponent as MoneyDeliveryImage } from '../../../styles/images/MoneyDeliveryImage.svg';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';

export const getToolBarItems = (setMonth) => (handleSearchChange) => {
  const onChangeDate = (date) => {
    setMonth(date);
  };

  return [
    {
      name: 'infoGroup',
      direction: 'vertical',
      children: [
        {
          name: 'title',
          component: (
            <Typography.Title>Список оплат контрагентов</Typography.Title>
          ),
        },
        {
          name: 'searchGroup',
          children: [
            {
              name: 'search',
              component: (
                <SearchInput
                  onChange={handleSearchChange}
                  placeholder={'имя контрагента'}
                />
              ),
            },
            {
              name: 'date',
              component: (
                <DatePicker
                  defaultValue={getThisMonth()}
                  picker="month"
                  format={monthFormat}
                  onChange={onChangeDate}
                />
              ),
            },
          ],
        },
        {
          name: 'createBtn',
          children: [
            {
              name: 'coinIcon',
              component: <CoinIcon />,
            },
            {
              name: 'btn',
              component: (
                <ModalModifyItems
                  data={null}
                  typeData={FORM_TYPES.PAYMENT}
                  actionType={FORM_ACTIONS.CREATE}
                />
              ),
            },
          ],
        },
      ],
    },

    {
      name: 'image',
      component: <MoneyDeliveryImage />,
    },
  ];
};
