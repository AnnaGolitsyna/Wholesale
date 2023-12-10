import { Input, InputNumber, DatePicker, Checkbox, Space, Button } from 'antd';
import NewspaperIcon from '../../../../styles/icons/NewspaperIcon';
import CursorSvg from '../../../../styles/icons/CursorIcon';
import { extractDecimalSurcharge } from '../../../../utils/priceUtils';
import SelectContractor from '../../components/selectContractor/SelectContractor';
import  updateProductPrices  from './updateProductPrices';

const getFieldsForGoodsFormList = (form) => {
  const titleObj = {
    icon: <NewspaperIcon style={{ fontSize: 60 }} />,
    titleText: 'Информация о товаре',
  };
  const formList = [
    {
      name: 'name',
      label: 'Наименование',
      component: <Input placeholder="наименование товара" />,
      rules: [{ required: true, message: 'Заполните обязательное поле' }],
      hasFeedback: true,
    },
    {
      name: 'fullName',
      label: 'Полное наименование',
      component: (
        <Input.TextArea
          placeholder="полное наименование товара (для документов)"
          rows={1}
        />
      ),
      rules: [{ required: true, message: 'Заполните обязательное поле' }],
      hasFeedback: true,
    },
    {
      name: 'supplier',
      label: 'Поставщик',
      hasFeedback: true,
      // rules: [{ required: true, message: 'Выберите поставщика из списка' }],
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
      name: 'pricesList',
      label: 'Цены реализации',
      children: [
        {
          name: 'superBulk',
          label: 'Крупный опт',
          rules: [{ type: 'number' }],
          tooltip: extractDecimalSurcharge('superBulk'),
          component: (
            <InputNumber
              placeholder="цена для крупного опта"
              style={{
                width: '100%',
              }}
              step={0.01}
            />
          ),
        },
        {
          name: 'bulk',
          label: 'Опт',
          rules: [{ type: 'number' }],
          tooltip: extractDecimalSurcharge('bulk'),
          component: (
            <InputNumber
              placeholder="цена для опта"
              style={{
                width: '100%',
              }}
              step={0.01}
            />
          ),
        },
        {
          name: 'retail',
          label: 'Розница',
          rules: [{ type: 'number' }],
          tooltip: extractDecimalSurcharge('retail'),
          component: (
            <InputNumber
              placeholder="цена для розницы"
              style={{
                width: '100%',
              }}
              step={0.01}
            />
          ),
        },
      ],
    },
    {
      name: 'priceBtn',
      component: (
        <Button block type="text" onClick={() => updateProductPrices(form)}>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <CursorSvg style={{ fontSize: 40 }} />
            <span>Рассчитать цены реализации</span>
          </Space>
        </Button>
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

    {
      name: 'active',
      valuePropName: 'checked',
      component: <Checkbox>Товар в реализации</Checkbox>,
    },
  ];
  return { titleObj, formList };
};

export { getFieldsForGoodsFormList };
