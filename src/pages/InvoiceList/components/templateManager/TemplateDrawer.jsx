import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Drawer,
  Table,
  message,
  Space,
  ConfigProvider,
  theme,
} from 'antd';
import TemplateAction from './TemplateAction';
import { ReactComponent as ViewIcon } from '../../../../styles/icons/tools/ViewIcon.svg';
import { drawerColumns } from './drawerColumns';
import InfoIcon from '../../../../components/notification/InfoIcon';

const TemplateDrawer = ({ products, addProducts, onClose }) => {
  const { token } = theme.useToken();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const handleAddSelectedProducts = () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('Пожалуйста, выберите товары для добавления');
      return;
    }

    const selectedProducts = products.filter((product) =>
      selectedRowKeys.includes(product.name),
    );

    addProducts(selectedProducts);

    messageApi.success(`Добавлено ${selectedProducts.length} эл.`);
    setIsDrawerVisible(false);
    onClose();
  };

  return (
    <>
      {contextHolder}
      <TemplateAction
        Icon={ViewIcon}
        text="Узнай что в шаблоне"
        onClick={() => setIsDrawerVisible(true)}
      />
      <Drawer
        title={
          <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            Список товаров
            <InfoIcon type="template" />
          </Space>
        }
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        width="70%"
      >
        <ConfigProvider
          theme={{
            components: {
              Table: {
                rowSelectedBg: token.selectedRowBg,
                rowSelectedHoverBg: token.selectedRowBg,
              },
            },
          }}
        >
          <Table
            rowSelection={rowSelection}
            dataSource={products}
            columns={drawerColumns}
            rowKey="name"
          />
        </ConfigProvider>
        <Button type="primary" onClick={handleAddSelectedProducts}>
          Добавить выбранные
        </Button>
      </Drawer>
    </>
  );
};

TemplateDrawer.propTypes = {
  products: PropTypes.array.isRequired,
  addProducts: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TemplateDrawer;
