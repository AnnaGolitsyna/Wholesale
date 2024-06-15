import { Typography, DatePicker } from 'antd';
import { monthFormat, getThisMonth } from '../../../utils/dateUtils';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';


export const getToolBarItems =
  (title, color, ImageComponent, setMonth) => (handleSearchChange) => {
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
            component: (
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
                name: 'btn',
                component: (
                  <ModalModifyItems
                    data={null}
                    typeData="Invoice"
                    actionType="create"
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
