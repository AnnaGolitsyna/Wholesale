import { Typography, DatePicker, Grid } from 'antd';
import { monthFormat, getThisMonth } from '../../../utils/dateUtils';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';
import { getDisableMonthsAfterNext } from '../../../utils/dateUtils';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';

export const getToolBarItems =
  (title, color, ImageComponent, setMonth, docType) =>
  (handleSearchChange, searchTerm) => {
    const screens = Grid.useBreakpoint();
    const onChangeDate = (date) => {
      setMonth(date);
    };

    return [
      {
        name: 'infoGroup',
        direction: 'vertical',
        children: [
          {
            name: 'type',
            component: screens.lg && (
              <Typography.Title
                style={{
                  margin: '0 0 10px 0',
                  color,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {title}
              </Typography.Title>
            ),
          },
          {
            name: 'subTitle',
            children: [
              {
                name: 'title',
                component: (
                  <Typography.Title level={2} style={{ margin: '0 10px 0 0' }}>
                    Реестр накладных за:
                  </Typography.Title>
                ),
              },
              {
                name: 'date',
                component: (
                  <DatePicker
                    key={docType}
                    defaultValue={getThisMonth()}
                    picker="month"
                    format={monthFormat}
                    onChange={onChangeDate}
                    disabledDate={getDisableMonthsAfterNext}
                    allowClear={false}
                  />
                ),
              },
            ],
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
                name: 'btn',
                component: (
                  <ModalModifyItems
                    data={null}
                    typeData={FORM_TYPES.INVOICE}
                    actionType={FORM_ACTIONS.CREATE}
                    modalWidth="80%"
                  />
                ),
              },
            ],
          },
        ],
      },

      {
        name: 'image',
        component: ImageComponent,
      },
    ];
  };
