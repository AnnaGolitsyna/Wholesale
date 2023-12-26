import dayjs from 'dayjs';
import { Typography, Space } from 'antd';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import PuzzleIcon from '../../../../styles/icons/PuzzleIcon';


export const titleRenderer = (currentPageData) => {
  return (
    <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Space align="baseline">
        <Typography.Title level={3}>
          Прайс-лист от {getShortDateFormat(dayjs())}
        </Typography.Title>
        <Typography.Text>({currentPageData.length} шт.)</Typography.Text>
      </Space>

      <PuzzleIcon />
    </Space>
  );
};
