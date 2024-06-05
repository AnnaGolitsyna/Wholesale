import { DatePicker,Select } from 'antd';
import TreeSelectContractor from '../../../components/treeSelect/TreeSelectContractor';
import InfoGroup from '../components/infoGroup/InfoGroup';
import DynamicStatistic from '../components/dynamicStatistic/DynamicStatistic';
import DynamicButtonsGroup from '../components/dynamicButtonsGroup/DynamicButtonsGroup';
import DynamicTable from '../components/dynamicTable/DynamicTable';
import { validateModifyingDate } from '../../../utils/dateUtils';

const getFieldsForInvoiceFormList = (form, actionType, data) => {
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
          component: <TreeSelectContractor form={form} data={data} />,
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
        },
      ],
    },
    {
      keyname: 'block3',
      component: <DynamicButtonsGroup />,

    },

    {
      keyname: 'table',
      name: 'productList',
      rules: [{ required: true, message: 'Выберите хотя бы один продукт' }],
      component: <DynamicTable name="productList"  />,

    },
  ];
};

export { getFieldsForInvoiceFormList };
