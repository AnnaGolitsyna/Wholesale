import React from 'react';
import PropTypes from 'prop-types';
import { Button, Flex, Typography, theme } from 'antd';
import BackNavLink from '../../../../components/link/BackNavLink';
import { boxStyle } from '../../../../styles/boxStyle';
import { ReactComponent as NewUserIcon } from '../../../../styles/icons/users/NewUserIcon.svg';
import { FORM_TYPES } from '../../../../constants/formTypes';
import { ModalToPrint } from '../../../../features/printingDocs';

const PageHeader = ({ name }) => {
  const { token } = theme.useToken();
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        position: 'sticky',
        top: 66,
        zIndex: 1,
        backgroundColor: token.colorBgBase,
        margin: '0 0 10px 0',
        ...boxStyle,
      }}
    >
      <BackNavLink path={'/receivables'} text={'К списку контрагентов'} />
      <Flex align="center">
        <NewUserIcon />
        <Typography.Title level={5} style={{ margin: '0 0 0 10px' }}>
          {name}
        </Typography.Title>
      </Flex>

      <Button>Print</Button>
      {/* <ModalToPrint data={[]} type={FORM_TYPES.PRINT_INVOICE} /> */}
    </Flex>
  );
};

PageHeader.propTypes = {};

export default PageHeader;
