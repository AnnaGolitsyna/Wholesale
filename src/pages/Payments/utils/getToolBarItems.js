import { Typography, DatePicker, Grid } from 'antd';
import { monthFormat, getThisMonth } from '../../../utils/dateUtils';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';
import { ReactComponent as CoinIcon } from '../../../styles/icons/money/CoinIcon.svg';
import { ReactComponent as MoneyDeliveryImage } from '../../../styles/images/MoneyDeliveryImage.svg';
import { getDisableMonthsAfterNext } from '../../../utils/dateUtils';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';

export const getToolBarItems = (setMonth) => {
  let debounceTimer = null;

  return (handleSearchChange, searchTerm) => {
    const screens = Grid.useBreakpoint();
    const onChangeDate = (date) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => setMonth(date), 300);
    };

  return [
    {
      name: 'infoGroup',
      direction: 'vertical',
      children: [
        {
          name: 'title',
          component: screens.lg && (
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
                  value={searchTerm}
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
                  disabledDate={getDisableMonthsAfterNext}
                  allowClear={false}
                  cellRender={(current, info) => {
                    if (info.type !== 'month') return info.originNode;
                    if (current.year() === getThisMonth().year()) return info.originNode;
                    return (
                      <div className="ant-picker-cell-inner" style={{ color: '#b30002' }}>
                        {current.locale('en').format('MMM')}
                      </div>
                    );
                  }}
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
};
