import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Modal } from 'antd';
import ModifyingForm from '../modifyingForm/ModifyingForm';
import { ReactComponent as PrintPDFIcon } from '../../../../styles/icons/print/PrintPDFIcon.svg';
import usePrintCollectionOnce from '../../hook/usePrintCollectionOnce.js';

const ModalToPrint = ({ data, type }) => {
  const [open, setOpen] = useState(false);
  const { showBtnText, ...restFields } = usePrintCollectionOnce(type, data);

  const showBtn = (
    <Space>
      <PrintPDFIcon />
      <Button onClick={() => setOpen(true)}>{showBtnText || 'Печать'}</Button>
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
    productList: PropTypes.array.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export { ModalToPrint };
