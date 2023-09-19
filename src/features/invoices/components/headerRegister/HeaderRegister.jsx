import React, { useState } from 'react';
import {
  Typography,
  Col,
  Row,
  DatePicker,
  Divider,
  Button,
  ConfigProvider,
} from 'antd';
import { theme } from 'antd';
import ImageInvoice from '../imageInvoice/ImageInvoice';
import PropTypes from 'prop-types';
import ModalInvoice from '../modalInvoice/ModalInvoice';

const { useToken } = theme;

const HeaderRegister = ({ data, type }) => {
  const [isOpen, setOpen] = useState(false);
  const { token } = useToken();
  const { color, title, imgSrc } = data;

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorTextBase: color,
          },
          components: {
            Button: {
              colorPrimary: type === 'sale' ? color : token.colorSecondaryBtn,
            },
          },
        }}
      >
        <Row>
          <Col span={19}>
            <Row justify="space-around" align="middle">
              <Col>
                <Typography>
                  <Typography.Title
                    level={3}
                    style={{
                      marginTop: '14px',
                    }}
                  >
                    {title}
                  </Typography.Title>
                </Typography>
              </Col>
              <Col>
                <Button
                  className="active"
                  type="primary"
                  block
                  onClick={setOpen}
                >
                  Создать накладную
                </Button>
              </Col>
            </Row>

            <Row justify="space-around" align="middle">
              <Col span={11} style={{ textAlign: 'center' }}>
                <Divider>За месяц</Divider>
                <DatePicker className="active" size="middle" picker="month" />
              </Col>
              <Col span={11} style={{ textAlign: 'center' }}>
                <Divider>За период</Divider>
                <DatePicker.RangePicker className="active" size="middle" />
              </Col>
            </Row>
          </Col>

          <Col span={5}>
            <ImageInvoice src={imgSrc} color={color} />
          </Col>
        </Row>

        <Divider />
      </ConfigProvider>
      {isOpen && <ModalInvoice open={isOpen} setOpen={setOpen} type={type} />}
    </>
  );
};

HeaderRegister.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired,

  type: PropTypes.string.isRequired,
};

export default HeaderRegister;
