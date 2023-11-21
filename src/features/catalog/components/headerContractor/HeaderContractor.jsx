import React from 'react';
import { Typography, Button, Space, Radio, theme } from 'antd';
import  { CrownTwoTone } from '@ant-design/icons';
import ContractorIcon from '../../../../styles/icons/ContractorsIcon';
// import PropTypes from 'prop-types'

const HeaderContractor = ({ handleCheckboxChange, handleModifyContractor }) => {
  const { token } = theme.useToken();
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
        <Space>
          <ContractorIcon
            style={{
              fontSize: '100px',
            }}
          />
          <Typography.Title level={3} style={{ margin: 3 }}>
            Список контрагентов
          </Typography.Title>
        </Space>
        <Radio.Group
          defaultValue="true"
          buttonStyle="solid"
          onChange={handleCheckboxChange}
        >
          <Radio.Button value="true">Действующие контрагенты</Radio.Button>
          <Radio.Button value="false">Недействующие контрагенты</Radio.Button>
        </Radio.Group>
      </Space>
      <Space size="middle">
        <CrownTwoTone
          twoToneColor={token.colorSecondaryBtn}
          style={{ fontSize: 32 }}
        />
        <Button type="primary" onClick={() => handleModifyContractor(null)}>
          Создать нового
        </Button>
      </Space>
    </Space.Compact>
  );
};

// HeaderContractor.propTypes = {}

export default HeaderContractor;
