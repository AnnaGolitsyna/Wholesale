import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

const getStyle = (value, token) => {
  const positiveValueStyle = {
    valueStyle: {
      color: token.textStatisticPositive,
      margin: 0,
    },
    prefix: <LikeOutlined style={{ marginRight: '10px' }}/>,
  };

  const negativeValueStyle = {
    valueStyle: {
      color: token.textStatisticNegative,
      margin: 0,
    },
    prefix: <DislikeOutlined style={{ marginRight: '10px' }} />,
  };

  return value < 0 ? negativeValueStyle : positiveValueStyle;
};

export { getStyle };
