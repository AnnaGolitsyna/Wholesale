import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';
import {FORM_ACTIONS} from '../../../../constants/formTypes';

const actionObject = {
  [FORM_ACTIONS.EDIT]: (onClick) => <EditOutlined onClick={onClick} />,
  [FORM_ACTIONS.COPY]: (onClick) => <CopyOutlined onClick={onClick} />,
  [FORM_ACTIONS.CREATE]: (onClick, btnText, disabled) => (
    <Button block type="primary" onClick={onClick} disabled={disabled}>
      {btnText}
    </Button>
  ),
};

const ModalOpener = React.memo(({ actionType, onClick, btnText, disabled }) => {
  return actionObject[actionType](onClick, btnText, disabled);
});

ModalOpener.propTypes = {
  actionType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  btnText: PropTypes.string,
  disabled: PropTypes.bool,
};

ModalOpener.defaultProps = {
  btnText: 'Создать',
  disabled: false,
};

export default ModalOpener;
