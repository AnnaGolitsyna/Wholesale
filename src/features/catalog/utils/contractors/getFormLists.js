import { Input, DatePicker, Checkbox, Select, Tooltip, Table } from 'antd';
import { EditOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import ClientIcon from '../../../../styles/icons/ClientIcon';
import SupportIcon from '../../../../styles/icons/SupportIcon';
import { categoryContractor } from '../../../../constants/categoryContractor';
import AddOnModal from '../../components/modalItem/AddOnModal';
import Typography from 'antd/es/typography/Typography';

const getFieldsForContractorsFormList = (form, data) => {
  const relatedCompaniesList = form.getFieldValue('relatedCompanies');
  console.log('test', relatedCompaniesList);
  const titleObj = {
    iconTitle: <ClientIcon style={{ fontSize: 60 }} />,
    titleText: {
      create: 'Создание нового клиента',
      edit: 'Редактирование клиента',
    },
  };
  const formList = [
    {
      name: 'name',
      label: 'Наименование',
      component: <Input placeholder="сокращенное имя компании" />,
      rules: [{ required: true, message: 'Заполните обязательное поле' }],
      hasFeedback: true,
    },
    {
      name: 'id',
      // name: ['relatedCompanies', 'key'],
      component: <Input disabled />,
    },
    {
      name: 'fullName',
      label: 'Полное наименование',
      component: (
        <Input.TextArea
          placeholder="полное наименование компании (для документов)"
          rows={2}
        />
      ),
      rules: [{ required: true, message: 'Заполните обязательное поле' }],
      hasFeedback: true,
    },
    {
      name: 'category',
      label: 'Категория контрагента',
      hasFeedback: true,
      rules: [{ required: true, message: 'Выберите категорию из списка' }],
      component: (
        <Select
          placeholder="выбери категорию"
          options={categoryContractor}
          onChange={() => form.setFieldsValue({ categoryPrice: undefined })}
        />
      ),
    },

    {
      name: 'categoryPrice',
      label: 'Категория цен',
      hasFeedback: true,
      rules: [
        {
          required: true,
          message: 'Выберите категорию из списка',
        },
      ],
      condition: 'category',
      component: (optionsPrices) => (
        <Select placeholder="выбери категорию цен" options={optionsPrices} />
      ),
    },

    {
      label: 'E-mail',
      name: 'email',
      rules: [{ type: 'email' }],
      component: <Input placeholder="e-mail" />,
    },
    {
      label: 'Tелефон',
      name: 'phone',
      component: <Input placeholder="номер телефона" />,
    },
    {
      label: 'Код ОКППО/ИНН',
      name: 'taxNumber',
      tooltip: 'Налоговый код',
      rules: [
        {
          type: 'number',
          message: 'Введите только числа',
          validator: (rule, value) => {
            if (!value || /^[0-9]+$/.test(value)) {
              return Promise.resolve();
            }
            return Promise.reject('Введите только числа');
          },
        },
      ],
      component: <Input placeholder="налоговый код" />,
    },
    {
      label: 'Адрес',
      name: 'adress',
      component: (
        <Input.TextArea placeholder="полный адрес (для документов)" rows={3} />
      ),
    },
    {
      name: 'contract',
      children: [
        {
          label: 'Договор №',
          name: 'contractNumber',
          component: (
            <Input
              placeholder="номер договора"
              style={{
                width: '100%',
              }}
            />
          ),
        },

        {
          label: 'от',
          name: 'date',
          component: (
            <DatePicker
              placeholder="дата"
              format="YYYY-MM-DD"
              style={{
                width: '100%',
              }}
            />
          ),
        },

        {
          name: 'active',
          valuePropName: 'checked',
          component: (
            <Checkbox
              style={{
                width: '100%',
              }}
            >
              Активный
            </Checkbox>
          ),
        },
      ],
    },

    {
      label: 'Список связанных компаний - посредников',
      name: 'relatedCompanies',
      component:
        relatedCompaniesList && relatedCompaniesList.length > 0 ? (
          <Table
            dataSource={relatedCompaniesList}
            columns={[
              {
                title: 'Полное наименование',
                dataIndex: 'fullNameRC',
                key: 'fullNameRC',
              },
              {
                title: 'Статус',
                dataIndex: 'activeRC',
                key: 'activeRC',
                render: (status) =>
                  status ? <CheckOutlined /> : <StopOutlined />,
              },
              {
                title: <SupportIcon />,
                dataIndex: 'action',
                key: 'action',
                width: 80,
                fixed: 'right',
                render: (_, record) => (
                  <AddOnModal
                    //mainForm={form}
                    actionType="edite"
                    //data={record}
                    data={data}
                  />
                ),
              },
            ]}
          />
        ) : (
          <Typography.Text code> Связанных компаний нет</Typography.Text>
        ),
    },
    {
      name: 'addRelatedCompanies',
      component: (
        <AddOnModal
          //mainForm={form}
          actionType="create"
        />
      ),
    },
  ];
  return { titleObj, formList };
};

export { getFieldsForContractorsFormList };
