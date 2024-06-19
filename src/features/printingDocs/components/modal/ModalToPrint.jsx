import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Modal } from 'antd';
import ModifyingForm from '../modifyingForm/ModifyingForm';
import { ReactComponent as PrintPDFIcon } from '../../../../styles/icons/print/PrintPDFIcon.svg';
import usePrintCollectionOnce from '../../hook/usePrintCollectionOnce.js';
import { useGetGoodsListQuery } from '../../../../pages/Goods';

const ModalToPrint = ({ data, type }) => {
  const [open, setOpen] = useState(false);
  const { btnText, ...restFields } = usePrintCollectionOnce(type, data);

  //  companysName,
  //   defaultCheckedValues = [],
  //   requiredFieldsList = [],
  //   optionsList,
  //   title,
  //   btnText,
  //   loading,
  //   error,

  const showBtn = (
    <Space>
      <PrintPDFIcon />
      <Button onClick={() => setOpen(true)}>{btnText || 'Печать'}</Button>
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
          // companysName={companysName}
          // defaultCheckedValues={defaultCheckedValues}
          // requiredFieldsList={requiredFieldsList}
          // optionsList={optionsList}
          // title={title}
          // type={type}
          // loading={loading}
          // error={error}
          data={data}
          type={type}
          {...restFields}
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
