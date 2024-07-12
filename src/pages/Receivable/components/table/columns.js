import { Tag } from 'antd';
import {ReactComponent as NoDataIcon} from '../../../../styles/icons/noData/NoDataIcon.svg';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const columns = [
  {
    title: 'Контрагент',
    dataIndex: 'name',
    key: 'name',
    width: '60%',
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
