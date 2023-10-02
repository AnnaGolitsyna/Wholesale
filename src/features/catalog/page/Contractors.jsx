import React, { useState, useId } from 'react';
import { Typography, Table, Button, Space, theme, Radio, Form } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import ModalItem from '../components/modalItem/ModalItem';
import { contractorsList } from '../../../gateway/contractor';
import { contractorsColumns } from '../utils/tableColumns';


const { useToken } = theme;

const Contractors = () => {

  // const activeContractors = contractorsList.filter((el) => el.active);
  // const inactiveContractors = contractorsList.filter((el) => !el.active);

  const [contractors, setContractors] = useState(
    contractorsList.filter((el) => el.active)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const [form] = Form.useForm();
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
      ? setContractors(contractorsList.filter((el) => el.active))
      : setContractors(contractorsList.filter((el) => !el.active));
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

  const columns = contractorsColumns(handleModifyContractor);

  console.log('contractor', contractors);

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
        <ModalItem
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
