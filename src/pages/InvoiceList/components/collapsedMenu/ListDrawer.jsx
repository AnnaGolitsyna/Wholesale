import React, { useState } from 'react';
import { Button, Drawer, Table, message } from 'antd';
import ModalButton from './ModalButton';
import { ReactComponent as ViewIcon } from '../../../../styles/icons/tools/ViewIcon.svg';
import {listDrawerColumns} from './listDrawerColumns';

const ListDrawer = ({ modifyProdList, prodList, onCancel }) => {
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const handleAddSelectedProducts = () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('Пожалуйста, выберите продукты для добавления');
      return;
    }

    const filteredProducts = prodList.filter((product) =>
      selectedRowKeys.includes(product.name)
    );

    modifyProdList(filteredProducts);

    messageApi.success(`Добавлено ${filteredProducts.length} продуктов`);
    onClose();
    onCancel();
  };

  return (
    <>
      {contextHolder}
      <ModalButton
        Icon={ViewIcon}
        text="Узнай что в шаблоне"
        onClick={showDrawer}
      />
      <Drawer
        title="Список товаров"
        onClose={onClose}
        open={open}
        width={"70%"}

      >
        <Table
          rowSelection={rowSelection}
          dataSource={prodList}
          columns={listDrawerColumns}
          rowKey="name"
        />
        <Button type="primary" onClick={handleAddSelectedProducts}>
          Добавить выбранные
        </Button>
      </Drawer>
    </>
  );
};

export default ListDrawer;
