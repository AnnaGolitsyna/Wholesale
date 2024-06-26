import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Modal, List, Space, Typography, theme } from 'antd';
import HomerIcon from '../../styles/icons/HomerIcon';

const ModalUserError = ({ error, onClose }) => {
  const { token } = theme.useToken();
  const handleCancel = () => {
    onClose();
  };

  const data = error?.errorFields.map(({ errors }) => errors);

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
          <Space style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Typography.Title level={4}>
              Нужно еще немного поработать...
            </Typography.Title>
            <HomerIcon />
          </Space>
          <List
            bordered
            size="large"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text style={{ fontSize: '20px' }} code>
                  {item}
                </Typography.Text>{' '}
              </List.Item>
            )}
          />
        </Modal>
      </ConfigProvider>
    </>
  );
};

ModalUserError.propTypes = {
  error: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalUserError;
