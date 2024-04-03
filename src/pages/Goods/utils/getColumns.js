import React from 'react';
import PropTypes from 'prop-types';
import { Space, Tooltip, Tag } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';
import TagPrice from '../../../components/tags/TagPrice';
import SupportIcon from '../../../styles/icons/SupportIcon';
import { getShortDateFormat } from '../../../utils/dateUtils';
import {
  extractDecimalSurcharge,
  formattedPriceToString,
} from '../../../utils/priceUtils';
import { getFormattedDataForFilter } from '../../../utils/getFormattedDataForFilter';
import { formattedPrice } from '../../../utils/priceUtils';
import { formattedDateObj } from '../../../utils/dateUtils';
import { ModalModifyItems } from '../../../features/modifyingItems';
import { findIsDateInRange } from '../../../utils/findIsDateInRange';

const getGoodsColumns = (data) => {
  const getFormattedProduct = (product) => {
    const formattedProduct = product && {
      ...product,
      dateStart: product.dateStart ? formattedDateObj(product.dateStart) : null,
      dateEnd: product.dateEnd ? formattedDateObj(product.dateEnd) : null,
      cost: formattedPrice(product.cost),
    };
    return formattedProduct;
  };

  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (supplier) => <Tag>{supplier.label}</Tag>,
      filters: getFormattedDataForFilter(data),
      onFilter: (value, record) => record.supplier.value === value,
    },
    {
      title: 'Cтарт продаж',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (text) => {
        const formattedDate = getShortDateFormat(text);
        return text && findIsDateInRange(formattedDate, 17) ? (
          <Tag color="#4b0001">{formattedDate}</Tag>
        ) : (
          formattedDate
        );
      },
    },
    {
      title: 'Закупка',
      dataIndex: 'cost',
      key: 'cost',
      render: (number) => formattedPriceToString(number),
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('superBulk')}>
          <span>Кр.опт</span>
        </Tooltip>
      ),
      dataIndex: 'superBulk',
      key: 'superBulk',
      render: (number) => <TagPrice typePrice="superBulk" number={number} />,
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('bulk')}>
          <span>Опт</span>
        </Tooltip>
      ),
      dataIndex: 'bulk',
      key: 'bulk',
      render: (number) => <TagPrice typePrice="bulk" number={number} />,
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('retail')}>
          <span>Розница</span>
        </Tooltip>
      ),
      dataIndex: 'retail',
      key: 'retail',
      render: (number) => <TagPrice typePrice="retail" number={number} />,
    },
    {
      title: <SupportIcon />,
      dataIndex: 'action',
      key: 'action',
      width: 80,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip title="Изменить">
              {/* <EditOutlined
                onClick={(e) => {
                  const actionType = e.currentTarget.getAttribute('aria-label');
                  onClick(record, actionType);
                }}
              /> */}
              <ModalModifyItems
                data={getFormattedProduct(record)}
                typeData="Goods"
                actionType="edit"
              />
            </Tooltip>
            <Tooltip title="Копировать">
              {/* <CopyOutlined
                onClick={(e) => {
                  const actionType = e.currentTarget.getAttribute('aria-label');
                  onClick(record, actionType);
                }}
              /> */}
              <ModalModifyItems
                data={getFormattedProduct(record)}
                typeData="Goods"
                actionType="copy"
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  return { columns };
};

// const nestedColumns = [
//   {
//     title: 'Полное наименование',
//     dataIndex: 'fullName',
//     key: 'fullName',
//   },
//   {
//     title: 'Дата старта продаж',
//     dataIndex: 'dateStart',
//     key: 'dateStart',
//     render: (text) => text && getShortDateFormat(text),
//   },
//   {
//     title: 'Дата снятия с продажи',
//     dataIndex: 'dateEnd',
//     key: 'dateEnd',
//     render: (text) => text && getShortDateFormat(text),
//   },
// ];

getGoodsColumns.propTypes = {
  onClick: PropTypes.func.isRequired,
  contractorslist: PropTypes.array.isRequired,
};

export { getGoodsColumns };
// export { getGoodsColumns, nestedColumns };
