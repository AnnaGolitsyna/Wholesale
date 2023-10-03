import React, { useState, useId, useEffect } from 'react';
import { Typography, Table, Button, Space, theme, Radio, Form } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
// import { contractorsList } from '../../../gateway/contractor';
import { contractorsColumns } from '../utils/tableColumnsContractor';

const { useToken } = theme;

const Contractors = () => {
  // const activeContractors = contractorsList.filter((el) => el.active);
  // const inactiveContractors = contractorsList.filter((el) => !el.active);

  const [contractors, setContractors] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const [form] = Form.useForm();
  const id = useId();
  const { token } = useToken();

  const baseUrl = 'https://651bfcdb194f77f2a5af3176.mockapi.io/contractors';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setContractors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      ? setContractors(contractors.filter((el) => el.active))
      : setContractors(contractors.filter((el) => !el.active));
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

  // console.log('contractor', contractors);

  return (
    <>
      <HeaderContractor
        handleCheckboxChange={handleCheckboxChange}
        handleModifyContractor={handleModifyContractor}
      />
      
      <Table columns={columns} dataSource={contractors} />

      <Form form={form}>
        <ModalItem
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          data={selectedContractor}
          form={form}
        />
      </Form>
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
