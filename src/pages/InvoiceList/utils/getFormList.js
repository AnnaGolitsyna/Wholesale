import {
  Typography,
  Input,
  InputNumber,
  DatePicker,
  Table,
  Form,
  Radio,
  Statistic,
  Select,
  Button,
} from 'antd';
import { validateModifyingDate } from '../../../utils/dateUtils';
import TreeSelectContractor from '../../../components/treeSelect/TreeSelectContractor';
import FileIcon from '../../../styles/icons/FileIcon';
import { productListColumns } from './getColumns';
import { ModalToPrint } from '../../../features/printingDocs';
import { AddOnModal } from '../../../features/modifyingItems';
import { categoryPricesObj } from '../../../utils/priceUtils';
import { getProductListColumns } from './getProductListColumns';

const getFieldsForInvoiceFormList = (form, actionType, data) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    //setInvoiceType(e.target.value);
  };

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
    //  console.log('handleTS', value, prodList, newProductList);

    form.setFieldsValue({ ...data, productList: newProductList });
  };

  const handleLocStor = () => {
    const prodList = JSON.parse(localStorage.getItem('productList'));
    const typePrice = form.getFieldValue('priceType').value || 'retail';
    const newProductList = prodList?.map((product) => {
      return {
        ...product,
        selectedPrice: product[typePrice],
      };
    });
    form.setFieldsValue({ ...data, productList: newProductList });
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
          condition: 'sumCount',
          /**
           * @param component - The component for the field ('../../features/modifyingItems')
           */
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
      ],
    },
    {
      keyname: 'block3',
      condition: 'isNameCompleted',
      // children: [
      //   {
      //     name: 'addBtn', // add a correct name
      //     component: (
      //       <AddOnModal data={null} typeData="Invoice" actionType="create" />
      //     ),
      //   },
      //   {
      //     name: 'locStorBtn', // add a correct name
      //     component: (
      //       <Button onClick={handleLocStor}>Скопировать из шаблона</Button>
      //     ),
      //   },
      //   {
      //     name: 'id',
      //     keyname: 'id',
      //     component: (
      //       <Form.Item noStyle hidden>
      //         <Input disabled />
      //       </Form.Item>
      //     ),
      //   },
      //   {
      //     name: 'printBtn',
      //     component: <ModalToPrint data={data} type="priceList" />,
      //   },
      // ],
      // component: (
      //   <Form.Item
      //     shouldUpdate={(prevValues, currentValues) =>
      //       prevValues.name !== currentValues.name
      //     }
      //   >
      //     {({ getFieldValue }) => {
      //       return getFieldValue('name') ? (
      //         <>
      //           <Form.Item name="addBtn">
      //             <Button >Добавить</Button>
      //           </Form.Item>
      //           <Form.Item name="locStorBtn">
      //             <Button onClick={handleLocStor}>
      //               Скопировать из шаблона
      //             </Button>
      //           </Form.Item>
      //           <Form.Item name="id" keyname="id" noStyle hidden>
      //             <Input disabled />
      //           </Form.Item>
      //           <Form.Item name="printBtn">
      //             <ModalToPrint data={data} type="priceList" />
      //           </Form.Item>
      //         </>
      //       ) : null;
      //     }}
      //   </Form.Item>
      // ),
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
