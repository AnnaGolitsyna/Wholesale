import { Typography, Button, Space, Input, Image, DatePicker } from 'antd';
import SearchInput from '../../../components/searchInput/SearchInput';
import { getThreeMonthsInterval } from '../../../utils/dateUtils';
import DownloadIconSvg from '../../../styles/icons/DownloadIcon';
import UploadIcon from '../../../styles/icons/UploadIcon';
import {ModalModifyItems} from '../../../features/modifyingItems';

export const getToolBarItems = (data) => (handleSearchChange) => {
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    // handleDatePickerChange(date);
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
                  placeholder={'наименование товара'}
                />
              ),
            },
            {
              name: 'date',
              component: (
                <DatePicker.RangePicker
                  // defaultValue={datesInterval}
                  format="YYYY-MM-DD"
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
              name: 'DownloadIcon',
              component: <DownloadIconSvg />,
            },
            {
              name: 'btn',
              component: (
                // <Button type="primary" onClick={onClick}>
                //   Внести новую оплату
                // </Button>
                 <ModalModifyItems
                  data={null}
                  typeData="Payment"
                  actionType="create"
                />
              ),
            },
            {
              name: 'UploadIcon',
              component: <UploadIcon />,
            },
          ],
        },
      ],
    },

    {
      name: 'image',
      component: (
        <Image src="/money.svg" height="200px" width="100%" preview={false} />
      ),
    },
  ];
};
