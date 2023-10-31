import React, { useState, useId } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Table, Form } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
// import { contractorsList } from '../../../gateway/contractor';
import { contractorsColumns } from '../utils/tableColumnsContractor';
// import {
//   createNewContractor,
//   updateContractor,
//   fetchContractors,
// } from '../contractorsSlice';
import {
  useGetContractorsListQuery,
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../catalogApi';
// import {
//   selectorActiveContractors,
//   selectorInactiveContractors,
// } from '../contractors.selector';
// import { fetchData } from '../contractors.gateway';

const Contractors = () => {
  const { data } = useGetContractorsListQuery();
  const [createdContractor] = useAddContractorMutation();
  const [updatedContractor] = useUpdateContractorMutation();

  const contractorsList = data?.map(contractor => ({...contractor, key: contractor.id}))
   console.log(data, contractorsList);
  // console.log('add', createdContractor);
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
    console.log('newV', newValue);

    const existingIndex = contractorsList.findIndex(
      (contractor) => contractor.id === newValue.id
    );
    if (existingIndex === -1) {
      createdContractor(newValue);
    }
    // dispatch(updateContractor({ key: newValue.key, updatedData: newValue }));
    updatedContractor(newValue);
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
    console.log('contractor', contractor);
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
