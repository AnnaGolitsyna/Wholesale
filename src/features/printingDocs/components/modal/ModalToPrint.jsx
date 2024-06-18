import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Modal } from 'antd';
import ModifyingForm from '../modifyingForm/ModifyingForm';
import { ReactComponent as PrintPDFIcon } from '../../../../styles/icons/print/PrintPDFIcon.svg';
import usePrintCollectionOnce from '../../hook/usePrintCollectionOnce.js';
import { useGetGoodsListQuery } from '../../../../pages/Goods';

const ModalToPrint = ({ type }) => {

  const [open, setOpen] = useState(false);
  const {
    companysName,
    defaultCheckedValues = [],
    requiredFieldsList = [],
    optionsList,
    title,
    btnText,
    data,
    loading,
    error,
  } = usePrintCollectionOnce(type);

  const showBtn = (
    <Space>
      <PrintPDFIcon />
      <Button onClick={() => setOpen(true)}>{btnText}</Button>
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
        <ModifyingForm
          companysName={companysName}
          defaultCheckedValues={defaultCheckedValues}
          requiredFieldsList={requiredFieldsList}
          optionsList={optionsList}
          title={title}
          type={type}
          loading={loading}
          error={error}
          data={data}
        />
      </Modal>
    </>
  );
};

ModalToPrint.propTypes = {
  // data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export { ModalToPrint };
