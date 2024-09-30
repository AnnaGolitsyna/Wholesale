import { Input, InputNumber, DatePicker, Checkbox, Typography } from 'antd';
import SelectContractor from '../components/select/SelectContractor';
import PriceBtn from '../components/priceBtn/PriceBtn';
import ConfirmChangeBtn from '../../../components/popConfirm/ConfirmChangeBtn';
import {
  extractDecimalSurcharge,
  formatWithDots,
  parseWithDots,
} from '../../../utils/priceUtils';
import updateProductPrices from './updateProductPrices';
import { ReactComponent as ProductStarIcon } from '../../../styles/icons/goods/ProductStarIcon.svg';


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

          component: <ProductStarIcon />,
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
          rules: [{ required: true, message: 'Заполните поле "Наименование"' }],
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
      rules: [
        { required: true, message: 'Заполните поле "Полное наименование"' },
      ],
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
      hasFeedback: true,
      rules: [
        {
          type: 'number',
          required: true,
          message: 'Заполните цену закупки',
        },
      ],
      component: (
        <InputNumber
          placeholder="0.00"
          style={{
            width: '100%',
          }}
          step={0.01}
          onChange={formatWithDots}
          parser={parseWithDots}
        />
      ),
    },

    {
      keyname: 'pricesList',
      label: 'Цены реализации',
      children: [
        {
          name: 'superBulk',
          keyname: 'superBulk',
          label: 'Крупный опт',
          hasFeedback: true,
          rules: [
            {
              type: 'number',
              required: true,
              message: 'Заполните цену кр.опта',
            },
          ],
          tooltip: extractDecimalSurcharge('superBulk'),
          component: (
            <InputNumber
              placeholder="0.00"
              style={{
                width: '100%',
              }}
              step={0.01}
              onChange={formatWithDots}
              parser={parseWithDots}
            />
          ),
        },
        {
          name: 'bulk',
          keyname: 'bulk',
          label: 'Опт',
          hasFeedback: true,
          rules: [
            {
              type: 'number',
              required: true,
              message: 'Заполните цену опта',
            },
          ],
          tooltip: extractDecimalSurcharge('bulk'),
          component: (
            <InputNumber
              placeholder="0.00"
              style={{
                width: '100%',
              }}
              step={0.01}
              onChange={formatWithDots}
              parser={parseWithDots}
            />
          ),
        },
        {
          name: 'retail',
          keyname: 'retail',
          label: 'Розница',
          hasFeedback: true,
          rules: [
            {
              type: 'number',
              required: true,
              message: 'Заполните розничную цену',
            },
          ],
          tooltip: extractDecimalSurcharge('retail'),
          component: (
            <InputNumber
              placeholder="0.00"
              style={{
                width: '100%',
              }}
              step={0.01}
              onChange={formatWithDots}
              parser={parseWithDots}
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
          onConfirm={() => updateProductPrices(form)}
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
          rules: [
            { required: true, message: 'Дата поступления в продажу важна' },
          ],
          hasFeedback: true,
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
