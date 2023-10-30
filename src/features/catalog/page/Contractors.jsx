import React, { useState, useId, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Form } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
// import { contractorsList } from '../../../gateway/contractor';
import { contractorsColumns } from '../utils/tableColumnsContractor';
import {
  createNewContractor,
  updateContractor,
  fetchContractors,
} from '../contractorsSlice';
import {
  useGetContractorsListQuery,
  useAddContractorMutation,
} from '../catalogApi';
// import {
//   selectorActiveContractors,
//   selectorInactiveContractors,
// } from '../contractors.selector';
// import { fetchData } from '../contractors.gateway';

const Contractors = () => {
  const { data } = useGetContractorsListQuery();
  const { createdContractor, isLoading } = useAddContractorMutation();
  console.log(data);
  console.log('add', createdContractor);
  // const contractors = useSelector((state) => state.contractors.contractors);
  // const activeContractors = useSelector(selectorActiveContractors);
  // const inactiveContractors = useSelector(selectorInactiveContractors);
  // const dispatch = useDispatch();

  // const [contractors, setContractors] = useState(activeContractors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  // const [activeStatus, setActiveStatus] = useState('active');

  const [form] = Form.useForm();
  const idLocal = useId();

  // useEffect(() => {
  //   setContractors(
  //     activeStatus === 'active' ? activeContractors : inactiveContractors
  //   );
  // }, [activeStatus, activeContractors, inactiveContractors]);

  // useEffect(() => {
  //   dispatch(fetchContractors());
  // }, [dispatch]);

  const handleOk = (newValue) => {
    
    const existingIndex = data.findIndex(
      (contractor) => contractor.key === newValue.key
    );
    if (existingIndex === -1) {
      // dispatch(createNewContractor(newValue));
    }
    // dispatch(updateContractor({ key: newValue.key, updatedData: newValue }));

    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    // setActiveStatus(e.target.value);
  };

  const handleModifyContractor = (contractor) => {
    const initialValues = contractor ?? {
      key: idLocal,
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

      <Table columns={columns} dataSource={data} />

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
