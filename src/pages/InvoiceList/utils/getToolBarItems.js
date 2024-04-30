import { Typography, Image, DatePicker, Space, Button, Divider } from 'antd';
import { monthFormat, getThisMonth } from '../../../utils/dateUtils';
import DownloadIconSvg from '../../../styles/icons/DownloadIcon';
import UploadIcon from '../../../styles/icons/UploadIcon';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';


export const getToolBarItems = (color, setMonth) => (handleSearchChange) => {
  //   const onChangeDate = (date) => {
  //     setMonth(date);
  //   };

  return [
    {
      name: 'infoGroup',
      direction: 'vertical',
      children: [
        {
          name: 'title',
          component: (
            <Space direction="vertical">
              <Typography.Title level={2} style={{ margin: 0 }}>
                Реестр накладных
              </Typography.Title>
              <Typography.Title style={{ margin: '0 0 10px 0' }}>Продажи</Typography.Title>
            </Space>
          ),
        },

        {
          name: 'btn',
          component: <Button block>Создать новый документ</Button>,
          //   (
          //     <ModalModifyItems
          //       data={null}
          //       typeData="Payment"
          //       actionType="create"
          //     />
          //   ),
        },
      ],
    },
    {
      name: 'searchGroup',
      direction: 'vertical',
      children: [
        {
          name: 'month',
          children: [
            {
              name: 'dateTitle',
              component: (
                <Typography.Text
                  code
                  style={{ fontSize: '20px', margin: '10px 10px 0 0' }}
                >
                  Месяц
                </Typography.Text>
              ),
            },
            {
              name: 'date',
              component: (
                <DatePicker
                  defaultValue={getThisMonth()}
                  picker="month"
                  format={monthFormat}
                  // onChange={onChangeDate}
                />
              ),
            },
          ],
        },

        {
          name: 'search',
          component: (
            <SearchInput
              onChange={handleSearchChange}
              placeholder={'имя контрагента'}
            />
          ),
        },
      ],
    },
    {
      name: 'image',
      component: (
        <Image
          src="/clients.svg"
          height="200px"
          width="100%"
          preview={false}
          style={{ backgroundColor: color }}
        />
      ),
    },
  ];
};
