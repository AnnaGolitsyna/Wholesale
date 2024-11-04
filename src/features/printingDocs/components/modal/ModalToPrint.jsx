import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { Button, Space, Modal, Alert } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import ModifyingForm from '../modifyingForm/ModifyingForm';
import { ReactComponent as PrintPDFIcon } from '../../../../styles/icons/print/PrintPDFIcon.svg';
import usePrintCollectionOnce from '../../hook/usePrintCollectionOnce.js';
import { FORM_TYPES } from '../../../../constants/formTypes';

const ModalToPrint = ({ data, type, iconSize }) => {
  const [open, setOpen] = useState(false);
  const { showBtnText, ...restFields } = usePrintCollectionOnce(type, data);

  const showBtn = (
    <Space onClick={() => setOpen(true)}>
      {iconSize === 'min' ? (
        <PrinterOutlined style={{ cursor: 'pointer' }} />
      ) : (
        <>
          <PrintPDFIcon />
          <Button>{showBtnText || 'Печать'}</Button>
        </>
      )}
    </Space>
  );

  return (
    <>
      {showBtn}
      {open && (
        <Modal
          centered
          open={open}
          onCancel={() => setOpen(false)}
          width="80%"
          footer={null}
        >
          <ModifyingForm data={data} type={type} {...restFields} />
        </Modal>
      )}
    </>
  );
};

ModalToPrint.propTypes = {
  data: PropTypes.shape({
    productList: PropTypes.array,
  }),
  type: PropTypes.oneOf([
    FORM_TYPES.PRINT_INVOICE,
    FORM_TYPES.PRINT_PRICELIST,
    FORM_TYPES.PRINT_RECEIVABLE,
  ]).isRequired,
  iconSize: PropTypes.string,
};

ModalToPrint.defaultProps = {
  data: { productList: [] },
};

const ModalToPrintBoundary = withErrorBoundary(ModalToPrint, {
  FallbackComponent: <Alert type="error">"Something was wrong"</Alert>,
  onError(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error);
    console.error('Error details:', errorInfo.componentStack);
  },
});

export { ModalToPrintBoundary };
