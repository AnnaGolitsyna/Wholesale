import { Link } from 'react-router-dom';
import { Tag, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import NavLinkWithIcon from '../../../../components/link/NavLinkWithIcon';
import { ReactComponent as NoDataIcon } from '../../../../styles/icons/noData/NoDataIcon.svg';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const columns = [
  {
    title: 'Контрагент',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => (
      <NavLinkWithIcon
        path={`/receivables/${record.id}/${name}`}
        LincIcon={<EyeOutlined />}
        text={name}
      />
    ),
  },
  {
    title: 'Долг',
    dataIndex: 'receivable',
    key: 'receivable',
    width: 110,
    align: 'center',
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
