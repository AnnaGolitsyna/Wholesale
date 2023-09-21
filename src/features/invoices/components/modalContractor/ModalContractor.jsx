import React from 'react';
import { Button,  Select, Form, Input, Modal, DatePicker, Space } from 'antd';
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

const ModalContractor = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      title="Новый контрагент"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label={'Наименование'}>
          <Input placeholder="введи сокращенное имя компании" />
        </Form.Item>
        <Form.Item label={'Полное наименование'}>
          <Input.TextArea
            placeholder="введи полное наиенование компании (для документов)"
            rows={2}
          />
        </Form.Item>
        <Form.Item label={'Категория контрагента'}>
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={'E-mail'}>
          <Input placeholder="введи e-mail" />
        </Form.Item>
        <Form.Item label={'Контактный телефон'}>
          <Input placeholder="введи номер телефона" />
        </Form.Item>
        <Form.Item label={'Код ОКППО/ИНН'}>
          <Input placeholder="введи налоговый код" />
        </Form.Item>
        <Form.Item label={'Договор'}>
          <Space>
            <Input placeholder="введи номер договора" />
            <DatePicker />
          </Space>
        </Form.Item>
        <Form.Item label="Адрес">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item >
          <Button block type='primary'>Обновить список контрагентов</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// ModalContractor.propTypes = {}

export default ModalContractor;
