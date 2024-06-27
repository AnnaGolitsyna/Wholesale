import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { Button, Space, Modal } from 'antd';
import ModifyingForm from '../modifyingForm/ModifyingForm';
import { ReactComponent as PrintPDFIcon } from '../../../../styles/icons/print/PrintPDFIcon.svg';
import usePrintCollectionOnce from '../../hook/usePrintCollectionOnce.js';
import ErrorFallbackModal from '../../../../components/errors/ErrorFallbackModal.jsx';
import { PrinterOutlined } from '@ant-design/icons';

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
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width="80%"
        footer={null}
      >
        <ModifyingForm data={data} type={type} {...restFields} />
      </Modal>
    </>
  );
};

ModalToPrint.propTypes = {
  data: PropTypes.shape({
    productList: PropTypes.array,
  }),
  type: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
};

ModalToPrint.defaultProps = {
  data: { productList: [] },
};

const ModalToPrintBoundary = withErrorBoundary(ModalToPrint, {
  FallbackComponent: ErrorFallbackModal,
  onError(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error);
    console.error('Error details:', errorInfo.componentStack);
  },
});

export { ModalToPrintBoundary };
