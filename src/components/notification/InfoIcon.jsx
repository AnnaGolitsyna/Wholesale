import React from 'react';
import PropTypes from 'prop-types';
import { Typography, notification, theme } from 'antd';
import { ReactComponent as InquireIcon } from '../../styles/icons/tools/InquireIcon.svg';
import { contextValues } from './contextValues';



const InfoIcon = ({ type }) => {
  const [api, contextHolder] = notification.useNotification();
  const { token } = theme.useToken();

  const { message, description } = contextValues[type];

  const textDescription = description.map((item, index) => (
    <Typography.Paragraph key={`${index}${item}`}>{item}</Typography.Paragraph>
  ));
  const openNotification = () => {
    api.info({
      message,
      description: textDescription,
      style: {
        backgroundColor: token.colorBgAccent,
      },
    });
  };
  return (
    <>
      {contextHolder}
      <InquireIcon onClick={openNotification} />
    </>
  );
};

InfoIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InfoIcon;
