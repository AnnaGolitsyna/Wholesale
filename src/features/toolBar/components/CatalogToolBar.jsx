import React from 'react';
//import PropTypes from 'prop-types'
import { Typography, Button, Space, Radio } from 'antd';
import ContractorIcon from '../../../styles/icons/ContractorsIcon';
import NewContractorIcon from '../../../styles/icons/NewContractorIcon';
import { renderItems } from '../utils/renderItems';

// const itemsList = [
//   {
//     name: 'infoGroup',
//     direction: 'vertical',
//     children: [
//       {
//         name: 'title',
//         children: [
//           {
//             name: 'icon',
//             component: <ContractorIcon style={{ fontSize: 100 }} />,
//           },
//           {
//             name: 'title',
//             component: (
//               <Typography.Title level={3}>Список контрагентов</Typography.Title>
//             ),
//           },
//         ],
//       },
//       {
//         name: 'radioGroup',
//         component: (
//           <Radio.Group
//             defaultValue="true"
//             buttonStyle="solid"
//             // onChange={onStatusChange}
//           >
//             <Radio.Button value="true">Действующие контрагенты</Radio.Button>
//             <Radio.Button value="false">Недействующие контрагенты</Radio.Button>
//           </Radio.Group>
//         ),
//       },
//     ],
//   },
//   {
//     name: 'actionsGroup',
//     direction: 'vertical',
//     children: [
//       {
//         name: 'createBtn',
//         children: [
//           {
//             name: 'iconContractor',
//             component: <NewContractorIcon />,
//           },
//           {
//             name: 'btn',
//             component: (
//               <Button
//                 type="primary"
//                 // onClick={() => getItemData(null, 'create')}
//               >
//                 Создать нового
//               </Button>
//             ),
//           },
//         ],
//       },
//     ],
//   },
// ];

export const CatalogToolBar = ({ itemsList }) => {
  return (
    <>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '10px',
        }}
      >
        {renderItems(itemsList)}
      </Space>
      {/* <Space
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          margin: '0 10px 10px 10px',
        }}
      >
        <Space direction="vertical">
          <Space>
            <ContractorIcon
              style={{
                fontSize: 100,
              }}
            />
            <Typography.Title level={3} style={{ margin: 3 }}>
              Список контрагентов
            </Typography.Title>
          </Space>
          <Radio.Group
            defaultValue="true"
            buttonStyle="solid"
            // onChange={onStatusChange}
          >
            <Radio.Button value="true">Действующие контрагенты</Radio.Button>
            <Radio.Button value="false">Недействующие контрагенты</Radio.Button>
          </Radio.Group>
        </Space>
        <Space size="middle">
          <NewContractorIcon />
          <Button
            type="primary"
            // onClick={() => getItemData(null, 'create')}
          >
            Создать нового
          </Button>
        </Space>
      </Space> */}
    </>
  );
};

CatalogToolBar.propTypes = {};
