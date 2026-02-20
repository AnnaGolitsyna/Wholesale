import { Typography, DatePicker, Grid } from 'antd';
import { monthFormat, getThisMonth } from '../../../utils/dateUtils';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';
import { getDisableMonthsAfterNext } from '../../../utils/dateUtils';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';

export const getToolBarItems =
  (title, color, ImageComponent, setMonth, docType) => {
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
};
