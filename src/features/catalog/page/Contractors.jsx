import React, { useState } from 'react';
import { contractorsList } from '../../../gateway/contractor';
import { Typography, Table, Button, Space, Tag, theme, Radio, Checkbox } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

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
];

const Contractors = () => {
  const [contractors, setContractors] = useState(contractorsList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log('contractor', contractor);

  const { token } = useToken();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (newValue) => {
    console.log(newValue, contractorsList);
    setContractors((prevState) => {
      return [...prevState, newValue];
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      const activeContractors = contractors.filter((el) => el.active);
      setContractors(activeContractors);
    }
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
          <Radio.Group defaultValue="active" buttonStyle="solid">
            <Radio.Button value="active">Действующие контрагенты</Radio.Button>
            <Radio.Button value="b">Недействующие контрагенты</Radio.Button>

          </Radio.Group>
          {/* <Checkbox onChange={handleCheckboxChange}>
            Только действующие контрагенты
          </Checkbox> */}
        </Space>
        <Space size="middle">
          <UserAddOutlined
            style={{ color: token.colorSecondaryBtn, fontSize: 30 }}
          />
          <Button type="primary" onClick={showModal}>
            Создать нового
          </Button>
        </Space>
      </Space.Compact>
      <Table columns={columns} dataSource={contractors} />

      <ModalContractor
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
