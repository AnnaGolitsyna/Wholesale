import {
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  Typography,
} from 'antd';
import SelectContractor from '../components/select/SelectContractor';
import PriceBtn from '../components/priceBtn/PriceBtn';
import ConfirmChangeBtn from '../../../components/popConfirm/ConfirmChangeBtn';
import NewspaperIcon from '../../../styles/icons/NewspaperIcon';
import {
  extractDecimalSurcharge,
  formatWithDots,
  parseWithDots,
} from '../../../utils/priceUtils';
import updateProductPrices from './updateProductPrices';

const getFieldsForGoodsFormList = (form, actionType, data) => {
  const titleText = {
    create: 'Создание нового товара',
    edit: 'Редактирование товара',
    copy: 'Копирование товара',
  };

  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <NewspaperIcon style={{ fontSize: 60 }} />,
        },
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
    {
      keyname: 'nameId',
      children: [
        {
          name: 'name',
          keyname: 'name',
          label: 'Наименование',
          component: <Input placeholder="сокращенное имя компании" />,
          rules: [{ required: true, message: 'Заполните обязательное поле' }],
          hasFeedback: true,
        },
        {
          name: 'id',
          keyname: 'id',
          label: 'ID',
          component: <Input disabled />,
        },
      ],
    },

    {
      name: 'fullName',
      keyname: 'fullName',
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
      keyname: 'supplier',
      label: 'Поставщик',
      hasFeedback: true,
      rules: [{ required: true, message: 'Выберите поставщика из списка' }],
      component: <SelectContractor form={form} data={data} />,
    },
    {
      name: 'cost',
      keyname: 'cost',
      label: 'Цена закупки',
      rules: [{ type: 'number' }],
      component: (
        <InputNumber
          placeholder="0.00"
          style={{
            width: '100%',
          }}
          step={0.01}
          formatter={formatWithDots}
          parser={parseWithDots}
        />
      ),
    },

    {
      //name: 'pricesList',
      keyname: 'pricesList',
      label: 'Цены реализации',
      children: [
        {
          name: 'superBulk',
          keyname: 'superBulk',
          label: 'Крупный опт',
          rules: [{ type: 'number' }],
          tooltip: extractDecimalSurcharge('superBulk'),
          component: (
            <InputNumber
              placeholder="0.00"
              style={{
                width: '100%',
              }}
              step={0.01}
            />
          ),
        },
        {
          name: 'bulk',
          keyname: 'bulk',
          label: 'Опт',
          rules: [{ type: 'number' }],
          tooltip: extractDecimalSurcharge('bulk'),
          component: (
            <InputNumber
              placeholder="0.00"
              style={{
                width: '100%',
              }}
              step={0.01}
            />
          ),
        },
        {
          name: 'retail',
          keyname: 'retail',
          label: 'Розница',
          rules: [{ type: 'number' }],
          tooltip: extractDecimalSurcharge('retail'),
          component: (
            <InputNumber
              placeholder="0.00"
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
      keyname: 'priceBtn',
      component: data?.bulk ? (
        <ConfirmChangeBtn
          ConfirmBtn={PriceBtn}
          onClick={() => updateProductPrices(form)}
          description="Вы уверены, что хотите изменить цены реализации?"
        />
      ) : (
        <PriceBtn onClick={() => updateProductPrices(form)} />
      ),
    },
    {
      keyname: 'dateList',
      label: 'Даты реализации',
      children: [
        {
          name: 'dateStart',
          keyname: 'dateStart',
          label: 'Поступил в продажу',
          component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
        },
        {
          name: 'dateEnd',
          keyname: 'dateEnd',
          label: 'Снят с продаж',
          component: <DatePicker placeholder="дата" format="YYYY-MM-DD" />,
        },
      ],
    },

    {
      name: 'active',
      keyname: 'active',
      valuePropName: 'checked',
      component: <Checkbox>Товар в реализации</Checkbox>,
    },
  ];
};

export { getFieldsForGoodsFormList };
