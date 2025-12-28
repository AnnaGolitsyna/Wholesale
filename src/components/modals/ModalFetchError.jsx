import React from 'react'
import PropTypes from 'prop-types'
import { ConfigProvider, Modal, theme, Result } from 'antd';


const ModalFetchError = ({ error, onClose }) => {
  const { token } = theme.useToken();
  const handleCancel = () => {
    onClose();
  };

  // Handle both error objects and error strings
  const errorMessage = typeof error === 'string' ? error : error?.message || 'Unknown error';
  const errorCode = typeof error === 'object' ? error?.code : null;

    return (
    <>
      <ConfigProvider
        theme={{
          inherit: false,
          token: {
            colorBgBase: token.modalErrorBg,
            colorTextBase: token.colorTextBase,
          },
        }}
      >
        <Modal
          open={error ? true : false}
          footer={null}
          onCancel={handleCancel}
        >
          <Result status="500" title={errorMessage}>
            {errorCode}
          </Result>

        </Modal>
      </ConfigProvider>
    </>
  );
};

ModalFetchError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClose: PropTypes.func,
}

export default ModalFetchError