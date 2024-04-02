import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Modal } from 'antd';
import PrintIcon from '../../../../styles/icons/PrintIcon';
import ModifyingForm from '../modifyingForm/ModifyingForm';

const ModalToPrint = ({ data, type }) => {
  const [open, setOpen] = useState(false);
  const showBtn = (
    <Space>
      <PrintIcon />
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
