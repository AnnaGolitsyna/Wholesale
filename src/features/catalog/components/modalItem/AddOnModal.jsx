import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { theme, Modal, ConfigProvider, Button, Form, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { getFieldsForFormList } from '../../../../components/formForModal/getFieldsForFormList';
import renderFormItem from '../../../../components/formForModal/renderFormItem';


const AddOnModal = ({ typeData, actionType, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    await form
      .validateFields()
      .then((values) => {
        form.submit();
        setIsModalOpen(false);
        messageApi.open({
          duration: 5,
          type: 'warning',
          content:
            'Для сохранения изменений в данных о клиенте нажмите "Сохранить"',
        });
      })
      .catch((error) => {
        console.error('Validation error', error);
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
      });

  };

    const handleFormValuesChange = (changedValues, allValues) => {
      if ('name' in changedValues) {
        form.setFieldsValue({ fullName: changedValues.name });
      }
    };

  const formList = getFieldsForFormList(
    form,
    `${typeData}Additional`,
    actionType
  );


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
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: token.colorBgAccent,
            },
          },
        }}
      >
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={'Обновить'}
          cancelText={'Закрыть'}
          maskClosable={false}
          destroyOnClose
        >
          <Form
            name={`${typeData}Additional`}
            form={form}
            initialValues={data}
            preserve={false}
            onValuesChange={handleFormValuesChange}
          >
            {formList?.map((item) => {
              return (
                <Form.Item key={item.name} {...item}>
                  {renderFormItem(item)}
                </Form.Item>
              );
            })}
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

//AddOnModal.propTypes = {}

export default AddOnModal;


