import { Select, Typography, Input, Checkbox } from 'antd';
import TreeSelectContractor from '../../../components/treeSelect/TreeSelectContractor';
import DatePickerControlDate from '../../../components/datePicker/DatePickerControlDate';
import { OPERATION_TYPES } from '../../../constants/operationTypes';
import InfoGroup from '../components/infoGroup/InfoGroup';
import DynamicStatistic from '../components/dynamicStatistic/DynamicStatistic';
import DynamicButtonsGroup from '../components/dynamicButtonsGroup/DynamicButtonsGroup';
import DynamicTable from '../components/dynamicTable/DynamicTable';
import { validateModifyingDate } from '../../../utils/dateUtils';
import { dataListForStatistic } from '../constants/dataListForStatistic';

const getFieldsForInvoiceFormList = (
  form,
  actionType,
  data,
  fromOrders = false,
) => {
  if (fromOrders) {
    return [
      {
        keyname: 'block1',
        compact: true,
        children: [
          {
            keyname: 'title',
            component: <Typography.Title level={5}>Расходная накладная</Typography.Title>,
          },
          {
            keyname: 'type',
            name: 'type',
            ...(data?.type === undefined && { initialValue: OPERATION_TYPES.DEBET }),
            component: <Input disabled value={OPERATION_TYPES.DEBET} />,
          },
          {
            keyname: 'docType',
            name: 'docType',
            ...(data?.docType === undefined && { initialValue: OPERATION_TYPES.SALE }),
            component: <Input disabled value={OPERATION_TYPES.SALE} />,
          },
          {
            keyname: 'fromOrders',
            name: 'fromOrders',
            ...(data?.fromOrders === undefined && { initialValue: true }),
            valuePropName: 'checked',
            component: <Checkbox disabled checked />,
          },
          {
            keyname: 'id',
            name: 'id',
            component: <Typography.Text />,
          },
          {
            keyname: 'docNumber',
            name: 'docNumber',
            component: <Typography.Text />,
          },
        ],
      },
      {
        keyname: 'block2',
        compact: true,
        children: [
          {
            keyname: 'name',
            name: 'name',
            label: 'Контрагент',
            compact: true,
            component: <Select disabled size="small" />,
          },
          {
            keyname: 'date',
            name: 'date',
            label: 'Дата',
            compact: true,
            component: <DatePickerControlDate name="date" size="small" />,
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
            keyname: 'sum',
            name: 'sum',
            label: 'Сумма',
            compact: true,
            component: (
              <DynamicStatistic
                dataArray={dataListForStatistic}
                name="sum"
                size="small"
              />
            ),
          },
        ],
      },
      // {
      //   keyname: 'block3',
      //   compact: true,
      //   component: <DynamicButtonsGroup compact />,
      // },
      {
        keyname: 'table',
        name: dataListForStatistic,
        compact: true,
        rules: [{ required: true, message: 'Выберите хотя бы один продукт' }],
        component: <DynamicTable name={dataListForStatistic} compact />,
      },
    ];
  }

  return [
    {
      keyname: 'block1',
      children: [
        {
          keyname: 'titleBlock',
          component: <InfoGroup arrayName={dataListForStatistic} />,
        },
        {
          keyname: 'id',
          name: 'id',
          component: <Typography.Text />,
        },
        {
          keyname: 'docNumber',
          name: 'docNumber',
          component: <Typography.Text />,
        },
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
          component: <TreeSelectContractor form={form} data={data} />,
        },

        {
          keyname: 'date',
          name: 'date',
          label: 'Дата реализации',
          component: <DatePickerControlDate name="date" />,
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
            <DynamicStatistic dataArray={dataListForStatistic} name="sum" />
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
      name: dataListForStatistic,
      rules: [{ required: true, message: 'Выберите хотя бы один продукт' }],
      component: <DynamicTable name={dataListForStatistic} />,
    },
  ];
};

export { getFieldsForInvoiceFormList };
