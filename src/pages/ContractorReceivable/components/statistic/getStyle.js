import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

const getStyle = (value, token) => {
  const positiveValueStyle = {
    valueStyle: {
      color: token.textStatisticPositive,
      margin: 0,
      fontSize: '18px',
      textShadow: 'rgba(0, 0, 0, 0.3) 2px 4px 6px',
    },
    prefix: <LikeOutlined style={{ marginRight: '5px', fontSize: '16px' }} />,
  };

  const negativeValueStyle = {
    valueStyle: {
      color: token.textStatisticNegative,
      margin: 0,
      fontSize: '18px',
      textShadow: 'rgba(0, 0, 0, 0.3) 2px 4px 6px',
    },
    prefix: (
      <DislikeOutlined style={{ marginRight: '5px', fontSize: '16px' }} />
    ),
  };

  return value < 0 ? negativeValueStyle : positiveValueStyle;
};

export { getStyle };
