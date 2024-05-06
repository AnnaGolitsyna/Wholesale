import {
  Typography,
  Input,
  InputNumber,
  DatePicker,
  Table,
  Form,
  Radio,
  Statistic,
} from 'antd';
import { validateModifyingDate } from '../../../utils/dateUtils';
import TreeSelectContractor from '../../../components/treeSelect/TreeSelectContractor';
import FileIcon from '../../../styles/icons/FileIcon';
import { productListColumns } from './getColumns';
import { ModalToPrint } from '../../../features/printingDocs';
import { AddOnModal } from '../../../features/modifyingItems';

const getFieldsForInvoiceFormList = (form, actionType, data) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    //setInvoiceType(e.target.value);
  };

  const titleText = {
    create: 'Создание нового документа',
    edit: 'Редактирование документа',
  };

  const radioBtnText = {
    debet: 'Продажа товара покупателю',
    credit: 'Возврат на склад от покупателя',
  };

  return [
    {
      keyname: 'title',
      children: [
        {
          keyname: 'iconTitle',
          component: <FileIcon />,
        },
        {
          keyname: 'dynamicTitle',
          component: (
            <Typography.Title level={3}>
              {titleText[actionType] || 'Просмотр информации'}
            </Typography.Title>
          ),
        },
        {
          name: 'docNumber',
          keyname: 'docNumber',
          label: 'Номер документа',
          component: <Input disabled />,
        },
      ],
    },

    {
      keyname: 'block1',
      children: [
        {
          keyname: 'type',
          name: 'type',
          label: 'Тип операции',
          rules: [{ required: true, message: 'Выберите тип операции' }],
          // component: <Input />,
          component: (
            <Radio.Group
              buttonStyle="solid"
              onChange={handleChange}
              // defaultValue={invoiceType}
            >
              <Radio.Button value="debet">{radioBtnText.debet}</Radio.Button>
              <Radio.Button value="credit">{radioBtnText.credit}</Radio.Button>
            </Radio.Group>
          ),
        },
        {
          keyname: 'sum',
          name: 'sum',
          label: 'Сумма',
          // rules: [
          //   { type: 'number', required: true, message: 'Заполните сумму' },
          // ],
          component: (
            <Statistic precision={2} suffix="грн" />
            // <InputNumber
            //   placeholder="сумма оплаты"
            //   style={{
            //     width: '100%',
            //   }}
            //   disabled
            //   step={0.01}
            // />
          ),
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
          component: <Input disabled />,
        },
      ],
    },
    {
      keyname: 'block3',
      children: [
        {
          name: 'addBtn', // add a correct name
          component: (
            <AddOnModal data={null} typeData="Contractor" actionType="create" />
          ),
        },
        {
          name: 'printBtn',
          component: <ModalToPrint data={data} type="priceList" />,
        },
        /////// check do i really need it
        {
          name: 'id',
          keyname: 'id',
          // label: 'ID',

          component: (
            <Form.Item noStyle hidden>
              <Input disabled />
            </Form.Item>
          ),
        },
      ],
    },

    {
      keyname: 'table',
      name: 'productList',
      label: 'Товары',
      rules: [{ required: true, message: 'Выберите хотя бы один продукт' }],
      component: (
        <Table
          dataSource={data?.productList}
          columns={productListColumns}
          size="small"
          pagination={false}
        />
      ),
    },
  ];
};

export { getFieldsForInvoiceFormList };
