import { Typography, Image, DatePicker } from 'antd';
import { monthFormat, getThisMonth } from '../../../utils/dateUtils';
import DownloadIconSvg from '../../../styles/icons/arrows/DownloadIcon';
import UploadIcon from '../../../styles/icons/arrows/UploadIcon';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';

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
              name: 'DownloadIcon',
              component: <DownloadIconSvg />,
            },
            {
              name: 'btn',
              component: (
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
