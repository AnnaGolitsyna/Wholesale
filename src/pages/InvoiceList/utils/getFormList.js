import { Typography, Input, InputNumber, DatePicker, Table, Form, Radio } from 'antd';
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
      ],
    },
    {
      keyname: 'type',
      name: 'type',
      label: 'Тип транзакции',
      rules: [{ required: true, message: 'Выберите тип оплаты' }],
      // component: <Input />,
      component: (
        <Radio.Group
          buttonStyle="solid"
          onChange={handleChange}
          // defaultValue={invoiceType}
        >
          <Radio.Button value="debet">'Продажа товара покупателю'</Radio.Button>
          <Radio.Button value="credit">
            'Возврат на склад от покупателя'
          </Radio.Button>
        </Radio.Group>
      ),
    },

    {
      keyname: 'block1',
      children: [
        {
          keyname: 'date',
          name: 'date',
          label: 'Даты реализации',
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
          name: 'docNumber',
          keyname: 'docNumber',
          label: 'Номер документа',
          component: <Input disabled />,
        },

        {
          name: 'id',
          keyname: 'id',
          label: 'ID',
          // check do i really need it
          component: (
            <Form.Item noStyle hidden>
              <Input disabled />
            </Form.Item>
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
          rules: [{ required: true, message: 'Выберите поставщика из списка' }],
          component: <TreeSelectContractor form={form} data={data} />,
        },
        {
          keyname: 'priceType',
          name: 'priceType',
          label: 'Тип цены',
          component: <Input disabled />,
        },
        {
          keyname: 'sum',
          name: 'sum',
          label: 'Сумма оплаты',
          rules: [
            { type: 'number', required: true, message: 'Заполните сумму' },
          ],
          component: (
            <InputNumber
              placeholder="сумма оплаты"
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
      keyname: 'block3',
      children: [
        {
          name: 'printBtn',
          component: <ModalToPrint data={data} type="priceList" />,
        },
        {
          name: 'addBtn', // add a correct name
          component: (
            <AddOnModal data={null} typeData="Contractor" actionType="create" />
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
        <Table dataSource={data?.productList} columns={productListColumns} />
      ),
    },
  ];
};

export { getFieldsForInvoiceFormList };
