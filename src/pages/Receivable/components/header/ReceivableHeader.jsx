import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography } from 'antd';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { getTodayFullFormattedDate } from '../../../../utils/dateUtils';
import { boxStyle } from '../../../../styles/boxStyle';

const { Title } = Typography;

const ReceivableHeader = ({onChange}) => {
  return (
    <Row>
      <Col span={16}>
        <Title
          level={4}
          style={{ textAlign: 'center', margin: '0 0 20px 0', ...boxStyle }}
        >
          {`Дебиторская задолженность на ${getTodayFullFormattedDate()}`}
        </Title>
      </Col>
      <Col span={1}></Col>
      <Col span={7}>
        <SearchInput onChange={onChange} placeholder="Поиск по договору" />
      </Col>
    </Row>
  );
};

ReceivableHeader.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default ReceivableHeader;
