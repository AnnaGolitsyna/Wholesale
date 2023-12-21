import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Space, Radio, Input } from 'antd';
import NewspaperIcon from '../../../../styles/icons/NewspaperIcon';
import NewItemIcon from '../../../../styles/icons/NewItem';
import PriceListExcel from '../priceList/PriceListExcel';

const HeaderGoods = ({
  handleCheckboxChange,
  handleModifyContractor,
  handleSearchChange,
  productsList,
}) => {
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
      <Space direction="vertical">
        <Space size="middle">
          <NewItemIcon />
          <Button
            type="primary"
            onClick={() => handleModifyContractor(null, 'create')}
          >
            Создать новый товар
          </Button>
        </Space>
        <Input.Search
          placeholder="наименование товара"
          onChange={onChange}
          enterButton
          allowClear
        />
        <PriceListExcel productsList={productsList} />
      </Space>
    </Space>
  );
};

HeaderGoods.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  handleModifyContractor: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  productsList: PropTypes.array.isRequired,
};

export default HeaderGoods;

//  <Space
//    style={{
//      display: 'flex',
//      justifyContent: 'space-between',
//      alignItems: 'end',
//      margin: '0 10px 10px 10px',
//    }}
//  >
//    <Space direction="vertical">
//      <Space>
//        <NewspaperIcon
//          style={{
//            fontSize: 100,
//          }}
//        />
//        <Typography.Title level={3} style={{ margin: 3 }}>
//          Список товаров
//        </Typography.Title>
//      </Space>
//      <Radio.Group
//        defaultValue="true"
//        buttonStyle="solid"
//        onChange={handleCheckboxChange}
//      >
//        <Radio.Button value="true">Товары в реализации</Radio.Button>
//        <Radio.Button value="false">Сняты с реализации</Radio.Button>
//      </Radio.Group>
//    </Space>

//    <Space direction="vertical" size="large">
//      <PriceListExcel productsList={productsList} />
//      <Space size="middle">
//        <GiftTwoTone
//          twoToneColor={token.colorSecondaryBtn}
//          style={{ fontSize: 30 }}
//        />

//        <Button
//          type="primary"
//          onClick={() => handleModifyContractor(null, 'create')}
//        >
//          Создать новый товар
//        </Button>
//      </Space>

//      <Input.Search
//        placeholder="наименование товара"
//        onChange={onChange}
//        enterButton
//        allowClear
//      />
//    </Space>
//  </Space>;
