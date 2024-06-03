import { Typography, Input, DatePicker, Radio, Select } from 'antd';
import { validateModifyingDate } from '../../../utils/dateUtils';
import TreeSelectContractor from '../../../components/treeSelect/TreeSelectContractor';
import FileIcon from '../../../styles/icons/FileIcon';
import { productListColumns } from './getColumns';
import { ModalToPrint } from '../../../features/printingDocs';
import { AddOnModal } from '../../../features/modifyingItems';
import { categoryPricesObj } from '../../../utils/priceUtils';
import { getProductListColumns } from './getProductListColumns';
import InfoGroup from '../components/infoGroup/InfoGroup';

const getFieldsForInvoiceFormList = (form, actionType, data) => {
  const handleTreeSelectChange = (value) => {
    const prodList = form.getFieldValue('productList');
    if (!prodList) return;
    console.log(
      'handleTS',
      form.getFieldValue('name'),
      form.getFieldValue('productList')
    );

    // const prodList = JSON.parse(localStorage.getItem('productList'));
    const newProductList = prodList.map((product) => {
      return {
        ...product,
        selectedPrice: product[value],
      };
    });

    form.setFieldsValue({ ...data, productList: newProductList });
  };

  return [
    {
      keyname: 'titleBlock',
      name: 'type',
      rules: [{ required: true, message: 'Выберите тип операции' }],
      component: <InfoGroup />,
    },
    {
      keyname: 'block1',
      children: [
        // {
        //   name: 'docNumber',
        //   keyname: 'docNumber',
        //   label: 'Номер документа',
        //   component: <Input disabled />,
        // },
      ],
    },

    {
      keyname: 'block2',
      children: [
        {
          keyname: 'name',
          name: 'name',
          label: 'Наименование контрагента',
          hasFeedback: true,

          rules: [
            { required: true, message: 'Выберите контрагента из списка' },
          ],
          component: (
            <TreeSelectContractor
              form={form}
              data={data}
              handleTreeSelectChange={handleTreeSelectChange}
            />
          ),
        },

        {
          keyname: 'date',
          name: 'date',
          label: 'Дата реализации',
          component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
          rules: [
            {
              required: true,
              message: 'Выберите дату',
            },
            () => ({
              validator(_, value) {
                return validateModifyingDate(data, value);
              },
            }),
          ],
        },
        {
          keyname: 'priceType',
          name: 'priceType',
          label: 'Тип цены',
          component: <Select disabled />,
        },
        {
          keyname: 'sum',
          name: 'sum',
          label: 'Сумма',
          condition: 'sumCount',
          /**
           * @param component - The component for the field ('../../features/modifyingItems')
           */
        },
      ],
    },
    {
      keyname: 'block3',
      condition: 'isNameCompleted',
      /**
       * @param component - The component for the field ('../../features/modifyingItems')
       */
    },

    {
      keyname: 'table',
      name: 'productList',

      rules: [{ required: true, message: 'Выберите хотя бы один продукт' }],
      condition: 'isDynamicTable',
      /**
       * @param component - The component for the field ('../../features/modifyingItems')
       */
    },
  ];
};

export { getFieldsForInvoiceFormList };

//  {
//     keyname: 'title',
//     children: [
//       {
//         keyname: 'iconTitle',
//         component: <FileIcon />,
//       },
//       {
//         keyname: 'dynamicTitle',
//         component: (
//           <Typography.Title level={3}>
//             {titleText[actionType] || 'Просмотр информации'}
//           </Typography.Title>
//         ),
//       },
//       {
//         name: 'docNumber',
//         keyname: 'docNumber',
//         label: 'Номер документа',
//         component: <Input disabled />,
//       },
//     ],
//   },

//   {
//     keyname: 'block1',
//     children: [
//       {
//         keyname: 'type',
//         name: 'type',
//         label: 'Тип операции',
//         rules: [{ required: true, message: 'Выберите тип операции' }],

//         component: (
//           <RadioGroupForInvoice  />

//         ),
//       },
//       {
//         keyname: 'sum',
//         name: 'sum',
//         label: 'Сумма',
//         condition: 'sumCount',
//         /**
//          * @param component - The component for the field ('../../features/modifyingItems')
//          */
//       },
//     ],
//   },
