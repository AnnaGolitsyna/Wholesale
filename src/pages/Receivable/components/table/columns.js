import { Link } from 'react-router-dom';
import { Tag, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { ReactComponent as NoDataIcon } from '../../../../styles/icons/noData/NoDataIcon.svg';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const columns = [
  {
    title: 'Контрагент',
    dataIndex: 'name',
    key: 'name',
    width: '60%',
    render: (name, record) => (
      <Link key={record.id} to={`/receivables/${record.id}`}>
        <EyeOutlined style={{ color: '#fff1e0', marginRight: '5px' }} />
        <Typography.Text italic>{name}</Typography.Text>
      </Link>
    ),
  },
  {
    title: 'Долг',
    dataIndex: 'receivable',
    key: 'receivable',
    width: '40%',

    render: (receivable) => {
      if (typeof receivable !== 'number' || isNaN(receivable)) {
        return <NoDataIcon />;
      }
      return (
        <Tag color={receivable > 0 ? 'success' : 'warning'}>
          {formattedPriceToString(receivable)}
        </Tag>
      );
    },
  },
];

export { columns };
