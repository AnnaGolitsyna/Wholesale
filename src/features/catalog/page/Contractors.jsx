import React, { useState, useId, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Form } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
// import { contractorsList } from '../../../gateway/contractor';
import { contractorsColumns } from '../utils/tableColumnsContractor';
import { createNewContractor } from '../contractorsSlice';
// import { fetchData } from '../contractors.gateway';

const Contractors = () => {
  // const activeContractors = contractorsList.filter((el) => el.active);
  // const inactiveContractors = contractorsList.filter((el) => !el.active);

  const contractorsList = useSelector((state) => state.contractors.contractors);
  const dispatch = useDispatch();

  console.log(contractorsList);
  // const [contractors, setContractors] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const [form] = Form.useForm();
  const id = useId();

  // const baseUrl = 'https://651bfcdb194f77f2a5af3176.mockapi.io/contractors';

  // useEffect(() => {
  //   console.log(fetchData());
  //   fetchData().then((contractorsList) => {
  //     setContractors(contractorsList);
  //   });
  // }, []);

  const handleOk = (newValue) => {
    const existingIndex = contractorsList.findIndex(
      (contractor) => contractor.key === newValue.key
    );
    if (existingIndex === -1) {
      // setContractors((prevState) => {
      //   return [...prevState, newValue];
      // });
      dispatch(createNewContractor());
    }
    // else {
    //   setContractors((prevState) => {
    //     return prevState.map((contractor, index) => {
    //       if (index === existingIndex) {
    //         return newValue;
    //       }
    //       return contractor;
    //     });
    //   });
    // }
    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    // e.target.value === 'active'
    //   ? setContractors(contractors.filter((el) => el.active))
    //   : setContractors(contractors.filter((el) => !el.active));
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



  return (
    <>
      <HeaderContractor
        handleCheckboxChange={handleCheckboxChange}
        handleModifyContractor={handleModifyContractor}
      />

      <Table columns={columns} dataSource={contractorsList} />

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
