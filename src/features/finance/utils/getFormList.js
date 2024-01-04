import { Input, InputNumber, DatePicker, Checkbox, Space, Button } from 'antd';
import SelectContractor from '../../catalog/components/selectContractor/SelectContractor';
import NewspaperIcon from '../../../styles/icons/NewspaperIcon';
//import CursorSvg from '../../../../styles/icons/CursorIcon';
//import { extractDecimalSurcharge } from '../../../../utils/priceUtils';
//import updateProductPrices from './updateProductPrices';

const getFieldsForPaymentsFormList = (form) => {
  const titleObj = {
    icon: <NewspaperIcon style={{ fontSize: 60 }} />,
    titleText: {
      create: 'Создание новой транзакции',
      edit: 'Редактирование транзакции',
      'delete-row': 'Удаление транзакции',
    },
  };
  const formList = [
    {
      name: 'supplier',
      label: 'Поставщик',
      hasFeedback: true,
      rules: [{ required: true, message: 'Выберите поставщика из списка' }],
      component: <SelectContractor form={form} />,
    },
    {
      name: 'cost',
      label: 'Цена закупки',
      rules: [{ type: 'number' }],
      component: (
        <InputNumber
          placeholder="цена закупки"
          style={{
            width: '100%',
          }}
          step={0.01}
        />
      ),
    },

    {
      label: 'Даты реализации',
      name: 'dateList',
      children: [
        {
          label: 'Поступил в продажу',
          name: 'dateStart',
          component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
        },
        {
          label: 'Снят с продаж',
          name: 'dateEnd',
          component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
        },
      ],
    },
  ];
  return { titleObj, formList };
};

export { getFieldsForPaymentsFormList };
