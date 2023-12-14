import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Space, Radio, Input, theme } from 'antd';
import { GiftTwoTone } from '@ant-design/icons';
import NewspaperIcon from '../../../../styles/icons/NewspaperIcon';

const HeaderGoods = ({
  handleCheckboxChange,
  handleModifyContractor,
  handleSearchChange,
}) => {
  const { token } = theme.useToken();

  const onChange = (e) => {
    handleSearchChange(e.target.value);
  };

  return (
    <Space
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        margin: '0 10px 10px 10px',
      }}
    >
      <Space direction="vertical">
        <Space>
          <NewspaperIcon
            style={{
              fontSize: 100,
            }}
          />
          <Typography.Title level={3} style={{ margin: 3 }}>
            Список товаров
          </Typography.Title>
        </Space>
        <Radio.Group
          defaultValue="true"
          buttonStyle="solid"
          onChange={handleCheckboxChange}
        >
          <Radio.Button value="true">Товары в реализации</Radio.Button>
          <Radio.Button value="false">Сняты с реализации</Radio.Button>
        </Radio.Group>
      </Space>

      <Space direction="vertical" size="large">
        <Space size="middle">
          <GiftTwoTone
            twoToneColor={token.colorSecondaryBtn}
            style={{ fontSize: 30 }}
          />

          <Button type="primary" onClick={() => handleModifyContractor(null, 'create')}>
            Создать новый товар
          </Button>
        </Space>

        <Input.Search
          placeholder="наименование товара"
          onChange={onChange}
          enterButton
          allowClear
        />
      </Space>
    </Space>
  );
};

HeaderGoods.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  handleModifyContractor: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default HeaderGoods;
