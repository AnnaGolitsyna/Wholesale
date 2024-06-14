import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Modal } from 'antd';
import ModifyingForm from '../modifyingForm/ModifyingForm';
import { ReactComponent as PrintPDFIcon } from '../../../../styles/icons/print/PrintPDFIcon.svg';

const ModalToPrint = ({ data, type }) => {
  const [open, setOpen] = useState(false);
  const showBtn = (
    <Space>
      <PrintPDFIcon />
      <Button onClick={() => setOpen(true)}>На печать</Button>
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
        <ModifyingForm data={data} type={type} />
      </Modal>
    </>
  );
};

ModalToPrint.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export { ModalToPrint };
