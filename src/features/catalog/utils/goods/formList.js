import {
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  Select,
  Space,
  Button,
} from 'antd';
import NewspaperIcon from '../../../../styles/icons/NewspaperIcon';
import CursorSvg from '../../../../styles/icons/CursorIcon';
import {
  categoryPrices,
  decimalPartNumber,
  extractDecimalSurcharge,
} from '../../../../utils/priceUtils';

const getGoodsFormItemsObj = (onClick) => {
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
      component: (
        <Select
          placeholder="выбери поставщика"
          // options={categoryContractor}
          // onChange={onChange}
        />
      ),
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
          tooltip: extractDecimalSurcharge(categoryPrices.superBulk.surcharge),
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
          tooltip: extractDecimalSurcharge(categoryPrices.bulk.surcharge),
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
          tooltip: extractDecimalSurcharge(categoryPrices.retail.surcharge),
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
      // label: 'Цена закупки',
      // rules: [{ type: 'number' }],
      component: (
        <Button block type="text" onClick={onClick}>
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

export { getGoodsFormItemsObj };
