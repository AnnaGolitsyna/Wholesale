import React, { useState, useId } from 'react';
import { contractorsList } from '../../../gateway/contractor';
import {
  Typography,
  Table,
  Button,
  Space,
  Tag,
  theme,
  Radio,
  Tooltip,
  Form,
} from 'antd';
import { UserAddOutlined, EditOutlined } from '@ant-design/icons';

import ModalContractor from '../components/modalContractor/ModalContractor';
import { categoryContractor } from '../utils/categoryContractor';
// import PropTypes from 'prop-types'
//  {
//     id: '1',
//     name: 'Пресс-Курьер',
//     fullName: `ТОВ "Пресс-Кур'єр Україна"`,
//     category: 'supplier',
//     taxNumber: '34494387',
//     contractNumber: '81/D',
//     contractDate: '',
//     email: '',
//     phone: '044-495-48-43',
//     adress: '04053, м.Київ, пров.Киянівський, буд.3-7',
//   },

const { useToken } = theme;

const Contractors = () => {
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Цена',
      dataIndex: 'categoryPrice',
      key: 'categoryPrice',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const { label, color } = categoryContractor.find(
          ({ value }) => value === category
        );
        return (
          <>
            <Tag color={color}>{label}</Tag>
          </>
        );
      },

      filters: categoryContractor.map(({ label, value }) => ({
        text: label,
        value,
      })),

      onFilter: (value, record) => record.category === value,
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Tooltip title="Изменить">
            <EditOutlined onClick={() => handleModifyContractor(record)} />
          </Tooltip>
        );
      },
    },
  ];
  const activeContractors = contractorsList.filter((el) => el.active);
  const inactiveContractors = contractorsList.filter((el) => !el.active);

  const [contractors, setContractors] = useState(activeContractors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const id = useId();

  const { token } = useToken();

  const handleOk = (newValue) => {
    const existingIndex = contractors.findIndex(
      (contractor) => contractor.key === newValue.key
    );
    if (existingIndex === -1) {
      setContractors((prevState) => {
        return [...prevState, newValue];
      });
    } else {
      setContractors((prevState) => {
        return prevState.map((contractor, index) => {
          if (index === existingIndex) {
            return newValue;
          }
          return contractor;
        });
      });
    }
    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    e.target.value === 'active'
      ? setContractors(activeContractors)
      : setContractors(inactiveContractors);
  };

  const handleModifyContractor = (contractor) => {
    const initialValues = contractor ?? {
      key: id,
      active: true,
      name: '',
      fullName: '',
      category: '',
      categoryPrice: '',
      taxNumber: '',
      contractNumber: '',
      contractDate: '',
      email: '',
      phone: '',
      adress: '',
    };
    setIsModalOpen(true);
    setSelectedContractor(initialValues);
  };

  return (
    <>
      <Space.Compact
        block
        style={{
          alignItems: 'baseline',
          justifyContent: 'space-evenly',
          marginBottom: 10,
        }}
      >
        <Space direction="vertical">
          <Typography.Title level={3} style={{ margin: 3 }}>
            Список контрагентов
          </Typography.Title>
          <Radio.Group
            defaultValue="active"
            buttonStyle="solid"
            onChange={handleCheckboxChange}
          >
            <Radio.Button value="active">Действующие контрагенты</Radio.Button>
            <Radio.Button value="inactive">
              Недействующие контрагенты
            </Radio.Button>
          </Radio.Group>
        </Space>
        <Space size="middle">
          <UserAddOutlined
            style={{ color: token.colorSecondaryBtn, fontSize: 30 }}
          />
          <Button type="primary" onClick={() => handleModifyContractor(null)}>
            Создать нового
          </Button>
        </Space>
      </Space.Compact>
      <Table columns={columns} dataSource={contractors} />

      <Form form={form}>
        <ModalContractor
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          contractor={selectedContractor}
          form={form}
        />
      </Form>
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
