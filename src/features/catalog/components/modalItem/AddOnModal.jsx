import React, { useState, useRef, useEffect } from 'react';
//import PropTypes from 'prop-types'
import { theme, Modal, ConfigProvider, Button, Form, Select } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import FormForModal from '../../../../components/formForModal/FormForModal';
import ModalCatalogItems from '../modalItem/ModalCatalogItems';
import { getAdditionalFieldsForContractorsFormList } from '../../utils/contractors/getAdditionalFormLists';
import renderFormItem2 from '../../../../components/formForModal/renderFormItem2';

const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};

const AddOnModal = ({ actionType, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = theme.useToken();

  // const mainForm = Form.useFormInstance();

  const [form] = Form.useForm();
  // useResetFormOnCloseModal({
  //   form,
  //   isModalOpen,
  // });

  const showModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = async () => {
  //   setIsModalOpen(false);
  //   const newValue = await form.validateFields();
  //   mainForm.setFieldsValue({ relatedCompanies: [newValue] });
  //   console.log('newVal', newValue, mainForm.getFieldsValue());
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  // console.log('modal-2', data, form.getFieldsValue());

  const formList = getAdditionalFieldsForContractorsFormList(form);

 // console.log('addModal', formList);

  const showBtn =
    actionType === 'edite' ? (
      <EditOutlined onClick={showModal} />
    ) : (
      <Button block type="text" icon={<PlusOutlined />} onClick={showModal}>
        Добавить связанную компанию - посредника
      </Button>
    );
  return (
    <>
      {showBtn}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: token.colorBgAccent,
            },
          },
        }}
      >
        {/* <ModalCatalogItems
          isModalOpen={isModalOpen}
          data={data}
          typeData="ContractorAdditional"
          actionType={actionType}
        /> */}
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={'Добавить'}
          cancelText={'Закрыть'}
          maskClosable={false}
          destroyOnClose
        >
          <Form
            name="additional"
            form={form}
            initialValues={data}
            // preserve={false}
          >
            {/* <FormForModal
             // form={form}
              typeData="ContractorAdditional"
              actionType={actionType}
              data={data}
            /> */}
            <>
              {formList?.map((item) => {
                console.log('FL2render', item);
                return (
                  <Form.Item key={item.name} {...item}>
                    {renderFormItem2(item)}
                  </Form.Item>
                );
              })}
            </>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

//AddOnModal.propTypes = {}

export default AddOnModal;
