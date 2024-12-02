import React from 'react';
import { Typography, Radio } from 'antd';
import SearchInput from '../../../components/searchInput/SearchInput';
import { ModalModifyItems } from '../../../features/modifyingItems';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';
import { ReactComponent as UsersIcon } from '../../../styles/icons/users/UsersIcon.svg';
import { ReactComponent as NewUserIcon } from '../../../styles/icons/users/NewUserIcon.svg';

export const getToolBarItems = (onStatusChange) => (handleSearchChange) => {
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
              component: <UsersIcon />,
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
              component: <NewUserIcon />,
            },
            {
              name: 'btn',
              component: (
                <ModalModifyItems
                  data={null}
                  typeData={FORM_TYPES.CONTRACTOR}
                  actionType={FORM_ACTIONS.CREATE}
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
