import React from 'react';
import { Typography, Radio } from 'antd';
import ContractorIcon from '../../../styles/icons/ContractorsIcon';
import NewContractorIcon from '../../../styles/icons/NewContractorIcon';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';

export const getToolBarItems = (handleSearchChange, onStatusChange) => {
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
                <ModalModifyItems
                  data={null}
                  typeData="Contractor"
                  actionType="create"
                />
              ),
            },
          ],
        },
        {
          name: 'search',
          component: (
            <SearchInput
              onChange={handleSearchChange}
              placeholder={'введите наименование'}
            />
          ),
        },
      ],
    },
  ];
};
