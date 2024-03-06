import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { getFieldsForFormList } from '../forms/getFieldsForFormList';
import renderFormItem from '../forms/renderFormItem';
import { updateRelatedCompaniesInForm } from './updateFieldsInAdditionalForm';
import useModalActions from '../../../hook/useModalActions';

const ModalModifyItems = ({ data, typeData, actionType }) => {
const [isModalOpen, setIsModalOpen] = useState(false);
 // const dispatch = useDispatch();
  const [form] = Form.useForm();

  console.log('modal', data, typeData, actionType);

  const { createItem, updateItem, btnText } = useModalActions(typeData);
  const showModal = () => {
    console.log('showModal', data, typeData, actionType);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const newValue = await form.validateFields();
      console.log('hsubmit', newValue, actionType);

      if (actionType === 'edit') {
        await updateItem(newValue);
      } else {
        await createItem(newValue);
      }
     // dispatch(closeModal());
     handleCancel();
    } catch (error) {
      console.error('Validation failed:', error);
      Modal.error({
        title: 'Не все поля были заполнены корректно',
        content: (
          <>
            {error.errorFields.map(({ errors, name }, index) => (
              <div key={index}>{`${errors}: ${name}`}</div>
            ))}
          </>
        ),
      });
    }
  };

  // const handleClose = () => {
  //   dispatch(closeModal());
  // };

  const handleFormValuesChange = (changedValues, allValues) => {
    if ('name' in changedValues) {
      form.setFieldsValue({ fullName: changedValues.name });
    }
  };

  const formList = getFieldsForFormList(form, typeData, actionType, data);

    const showBtn =
      actionType === 'edit' ? (
        <EditOutlined onClick={showModal} />
      ) : (
        <Button type="primary" onClick={showModal}>
          {btnText}
        </Button>
      );
  return (
    <>
      {showBtn}
      <Modal
        centered={true}
        open={isModalOpen}
        onOk={handleSubmit}
        okText={'Сохранить'}
        onCancel={handleCancel}
        cancelText={'Закрыть'}
        maskClosable={false}
        destroyOnClose
      >
        <Form.Provider
          onFormFinish={(formType, { values, forms }) => {
            const form = forms[typeData];
            const formData = form.getFieldsValue();
            if (formType === 'ContractorAdditional') {
              updateRelatedCompaniesInForm(values, formData, form);
            }
          }}
        >
          <Form
            name={typeData}
            layout="vertical"
            form={form}
            initialValues={data}
            preserve={false}
            onValuesChange={handleFormValuesChange}
          >
            {formList?.map((formItem) => (
              <Form.Item key={formItem.name} {...formItem}>
                {renderFormItem(formItem)}
              </Form.Item>
            ))}
          </Form>
        </Form.Provider>
      </Modal>
    </>
  );
};

const contractorData = PropTypes.shape({
  id: PropTypes.string,
  key: PropTypes.string,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string,
  fullName: PropTypes.string,
  category: PropTypes.string,
  categoryPrice: PropTypes.string,
  taxNumber: PropTypes.string,
  contractNumber: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  email: PropTypes.string,
  phone: PropTypes.string,
  adress: PropTypes.string,
  relatedCompanies: PropTypes.array,
});

const goodsData = PropTypes.shape({
  id: PropTypes.string,
  key: PropTypes.string,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string,
  fullName: PropTypes.string,
  supplier: PropTypes.string,
  cost: PropTypes.number,
  superBulk: PropTypes.number,
  bulk: PropTypes.number,
  retail: PropTypes.number,
  dateStart: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  dateEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
});

ModalModifyItems.propTypes = {
 // isModalOpen: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([contractorData, goodsData]),
  typeData: PropTypes.string.isRequired,
  actionType: PropTypes.string,
};

export {ModalModifyItems};

