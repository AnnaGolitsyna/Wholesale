import React, { useId } from 'react';
import {
  Button,
  Select,
  Form,
  Input,
  Modal,
  DatePicker,
  Space,
  Typography,
  theme,
} from 'antd';
import { IdcardTwoTone } from '@ant-design/icons';

import { categoryContractor } from '../../utils/categoryContractor';
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

const ModalContractor = ({ isModalOpen, handleOk, handleCancel }) => {
  const id = useId();
  const { token } = useToken();
  return (
    <Modal
      centered={true}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Space.Compact
          block
          style={{ alignItems: 'flex-start', justifyContent: 'space-evenly' }}
        >
          <IdcardTwoTone
            twoToneColor={token.colorInfo}
            style={{ fontSize: 40 }}
          />
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Новый контрагент
          </Typography.Title>
          <Form.Item name={'id'}>
            <Typography.Text style={{color: 'transparent'}}>{id}</Typography.Text>
          </Form.Item>
        </Space.Compact>
        <Form.Item label={'Наименование'} name={'name'}>
          <Input placeholder="сокращенное имя компании" />
        </Form.Item>
        <Form.Item label={'Полное наименование'} name={'fullName'}>
          <Input.TextArea
            placeholder="полное наиенование компании (для документов)"
            rows={2}
          />
        </Form.Item>
        <Form.Item label={'Категория контрагента'} name={'category'}>
          <Select options={categoryContractor} />
        </Form.Item>
        <Form.Item label={'E-mail'} name={'email'}>
          <Input placeholder="e-mail" />
        </Form.Item>
        <Form.Item label={'Tелефон'} name={'phone'}>
          <Space.Compact>
            <Input
              style={{
                width: '20%',
              }}
              defaultValue="+380"
            />
            <Input
              style={{
                width: '80%',
              }}
              placeholder="номер телефона"
            />
          </Space.Compact>
        </Form.Item>
        <Form.Item label={'Код ОКППО/ИНН'} name={'taxNumber'}>
          <Input placeholder="налоговый код" />
        </Form.Item>
        <Space>
          <Form.Item label={'Договор №'} name={'contractNumber'}>
            <Input placeholder="номер договора" />
          </Form.Item>
          <Form.Item label={'от'} name={'contractDate'}>
            <DatePicker />
          </Form.Item>
        </Space>
        <Form.Item label="Адрес" name={'adress'}>
          <Input.TextArea
            placeholder="полный адрес (для документов)"
            rows={3}
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Обновить список контрагентов
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// ModalContractor.propTypes = {}

export default ModalContractor;
