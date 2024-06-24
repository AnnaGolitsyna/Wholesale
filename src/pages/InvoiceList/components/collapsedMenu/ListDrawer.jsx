import React, { useState, useEffect } from 'react';
import { Button, Drawer, Table } from 'antd';
import ModalButton from './ModalButton';
import { ReactComponent as ViewIcon } from '../../../../styles/icons/tools/ViewIcon.svg';

const ListDrawer = () => {
  const [open, setOpen] = useState(false);
  const [prodList, setProdList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    if (open) {
      const storedProdList =
        JSON.parse(localStorage.getItem('productList')) || [];
      setProdList(storedProdList);
    }
  }, [open]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'В реализации',
      dataIndex: 'dateStart',
      key: 'dateStart',
    
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // selections: [
    //   Table.SELECTION_ALL,
    //   Table.SELECTION_INVERT,
    //   Table.SELECTION_NONE,
    // ],
  };



  return (
    <>
      <ModalButton
        Icon={ViewIcon}
        text="Узнай что в шаблоне"
        onClick={showDrawer}
      />
      <Drawer title="Список товаров" onClose={onClose} open={open} width={600}>

        <Table
          rowSelection={rowSelection}
          dataSource={prodList}
          columns={columns}
          rowKey="name"
        />
      </Drawer>
    </>
  );
};

export default ListDrawer;

// import React, { useState, useEffect } from 'react';
// import { Button, Drawer, Table } from 'antd';
// import ModalButton from './ModalButton';
// import { ReactComponent as ViewIcon } from '../../../../styles/icons/tools/ViewIcon.svg';

// const ListDrawer = () => {
//   const [open, setOpen] = useState(false);
//   const [prodList, setProdList] = useState([]);

//   useEffect(() => {
//     if (open) {
//       const storedProdList =
//         JSON.parse(localStorage.getItem('productList')) || [];
//       setProdList(storedProdList);
//     }
//   }, [open]);

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   const columns = [
//     {
//       title: 'Товар',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Цена',
//       dataIndex: 'selectedPrice',
//       key: 'selectedPrice',
//     },
//     {
//       title: 'Количество',
//       dataIndex: 'count',
//       key: 'count',
//     },
//   ];

//   return (
//     <>
//       <ModalButton
//         Icon={ViewIcon}
//         text="Узнай что в шаблоне"
//         onClick={showDrawer}
//       />
//       <Drawer title="Список товаров" onClose={onClose} open={open} width={600}>
//         <Table dataSource={prodList} columns={columns} rowKey="name" />
//       </Drawer>
//     </>
//   );
// };

// export default ListDrawer;
