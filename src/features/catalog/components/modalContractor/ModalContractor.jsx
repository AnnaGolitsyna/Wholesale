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

import { categoryContractor } from '../../../../gateway/contractor';
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
      <Form>
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
        </Space.Compact>
        <Form.Item label={'Код'}>
          <Typography.Text>{id}</Typography.Text>
        </Form.Item>
        <Form.Item label={'Наименование'}>
          <Input placeholder="сокращенное имя компании" />
        </Form.Item>
        <Form.Item label={'Полное наименование'}>
          <Input.TextArea
            placeholder="полное наиенование компании (для документов)"
            rows={2}
          />
        </Form.Item>
        <Form.Item label={'Категория контрагента'}>
          <Select>
            {categoryContractor.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={'E-mail'}>
          <Input placeholder="e-mail" />
        </Form.Item>
        <Form.Item label={'Контактный телефон'}>
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
        <Form.Item label={'Код ОКППО/ИНН'}>
          <Input placeholder="налоговый код" />
        </Form.Item>
        <Form.Item label={'Договор'}>
          <Space>
            <Input placeholder="номер договора" />
            <DatePicker />
          </Space>
        </Form.Item>
        <Form.Item label="Адрес">
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
