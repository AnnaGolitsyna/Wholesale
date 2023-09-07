import React from 'react';
// import PropTypes from 'prop-types'
import { Card } from 'antd';
import { brandTheme } from '../../styles/brandTheme';

const CardLink = ({ alt, src, title, description }) => {
  return (
    <Card
      hoverable
      style={{
        backgroundColor: brandTheme.token.colorBgBaseLight,
      }}
      cover={
        <img
          alt={alt}
          src={src}
          style={{
            backgroundColor: brandTheme.token.colorPrimary,
            maxHeight: '180px',
          }}
        />
      }
    >
      <Card.Meta
        title={title}
        description={description}
        style={{ textAlign: 'center' }}
      />
    </Card>
  );
};

// CardLink.propTypes = {}

export default CardLink;
