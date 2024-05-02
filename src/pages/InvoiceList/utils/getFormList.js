import { Typography } from 'antd';

const getFieldsForInvoiceFormList = (form, actionType, data) => {
  const titleText = {
    create: 'Создание нового документа',
    edit: 'Редактирование документа',
  };
  return [
    {
      keyname: 'title',
      children: [
        // {
        //   keyname: 'iconTitle',
        //   component: <ClientIcon style={{ fontSize: 100 }} />,
        // },
        {
          keyname: 'dynamicTitle',
          component: (
            <Typography.Title level={3}>
              {titleText[actionType] || 'Просмотр информации'}
            </Typography.Title>
          ),
        },
      ],
    },
  ];
};

export { getFieldsForInvoiceFormList };
