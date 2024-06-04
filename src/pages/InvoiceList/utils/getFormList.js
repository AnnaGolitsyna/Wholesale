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
import DynamicStatistic from '../components/dynamicStatistic/DynamicStatistic';

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
          component: (
            <DynamicStatistic dataArray="productList" name="sum" prefix="sum" />
          ),
          // condition: 'sumCount',
          // /**
          //  * @param component - The component for the field ('../../features/modifyingItems')
          //  */
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


