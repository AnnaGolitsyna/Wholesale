import React from 'react'
import { Typography, Button, Space, Radio, theme } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types'

const { useToken } = theme;

const HeaderContractor = ({ handleCheckboxChange, handleModifyContractor }) => {
const { token } = useToken();
    return (
    <Space.Compact
      block
      style={{
        alignItems: 'baseline',
        justifyContent: 'space-evenly',
        marginBottom: 10,
      }}
    >
      <Space direction="vertical">
        <Typography.Title level={3} style={{ margin: 3 }}>
          Список контрагентов
        </Typography.Title>
        <Radio.Group
          defaultValue="true"
          buttonStyle="solid"
          onChange={handleCheckboxChange}
        >
          <Radio.Button value="true">Действующие контрагенты</Radio.Button>
          <Radio.Button value="false">
            Недействующие контрагенты
          </Radio.Button>
        </Radio.Group>
      </Space>
      <Space size="middle">
        <UserAddOutlined
          style={{ color: token.colorSecondaryBtn, fontSize: 30 }}
        />
        <Button type="primary" onClick={() => handleModifyContractor(null)}>
          Создать нового
        </Button>
      </Space>
    </Space.Compact>
  );
};

// HeaderContractor.propTypes = {}

export default HeaderContractor