import React from 'react';
import { Typography, Button, Radio } from 'antd';
import ContractorIcon from '../../../styles/icons/ContractorsIcon';
import NewContractorIcon from '../../../styles/icons/NewContractorIcon';

export const getToolBarItems = (onStatusChange, getItemData) => {
  return [
    {
      name: 'infoGroup',
      direction: 'vertical',
      children: [
        {
          name: 'title',
          children: [
            {
              name: 'icon',
              component: <ContractorIcon style={{ fontSize: 100 }} />,
            },
            {
              name: 'title',
              component: (
                <Typography.Title level={3}>
                  Список контрагентов
                </Typography.Title>
              ),
            },
          ],
        },
        {
          name: 'radioGroup',
          component: (
            <Radio.Group
              defaultValue="true"
              buttonStyle="solid"
              onChange={onStatusChange}
            >
              <Radio.Button value="true">Действующие контрагенты</Radio.Button>
              <Radio.Button value="false">
                Недействующие контрагенты
              </Radio.Button>
            </Radio.Group>
          ),
        },
      ],
    },
    {
      name: 'actionsGroup',
      direction: 'vertical',
      children: [
        {
          name: 'createBtn',
          children: [
            {
              name: 'iconContractor',
              component: <NewContractorIcon />,
            },
            {
              name: 'btn',
              component: (
                <Button
                  type="primary"
                  onClick={() => getItemData(null, 'create')}
                >
                  Создать нового
                </Button>
              ),
            },
          ],
        },
      ],
    },
  ];
};
