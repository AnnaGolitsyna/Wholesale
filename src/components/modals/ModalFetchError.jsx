import React from 'react'
import PropTypes from 'prop-types'
import { ConfigProvider, Modal, theme, Result } from 'antd';


const ModalFetchError = ({ error, onClose }) => {
  const { token } = theme.useToken();
  const handleCancel = () => {
    onClose();
  };

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
          <Result status="500" title={error}>
            {error.code}
          </Result>

        </Modal>
      </ConfigProvider>
    </>
  );
};

ModalFetchError.propTypes = {
  error: PropTypes.object,
  onClose: PropTypes.func,
}

export default ModalFetchError