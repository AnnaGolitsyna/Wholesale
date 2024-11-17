import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio, ConfigProvider, Space } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { getPageStyle } from './getPageStyle';
import PrintContentHandler from '../contentComponent/PrintContentHandler';
import { FORM_TYPES } from '../../../../constants/formTypes';

const PrintPDFComponent = (props) => {
  const [isDuble, setIsDuble] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: getPageStyle(),
  });

  const { type } = props;

  const onChange = (e) => {
    setIsDuble(e.target.value);
  };

  return (
    <>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '10px 10px 0 0',
        }}
      >
        <Button
          type="primary"
          onClick={handlePrint}
          style={{ margin: '0 10px' }}
        >
          Печать
        </Button>
        {type !== FORM_TYPES.PRINT_PRICELIST && (
          <Radio.Group onChange={onChange} defaultValue={false}>
            <Radio value={false}>1 экз.на листе</Radio>
            <Radio value={true}>2 экз.на лист</Radio>
          </Radio.Group>
        )}
      </Space>

      <ConfigProvider
        theme={{
          inherit: false,
          components: {
            Table: {
              cellPaddingBlockSM: 1,
              cellPaddingBlock: 1,
              borderColor: '#8c8c8c',
              cellFontSizeSM: 13,
            },
          },
        }}
      >
        <div
          style={{
            margin: 10,
            padding: 10,
            border: '5px inset',
            background: 'white',
          }}
        >
          <div ref={componentRef}>
            <PrintContentHandler isDuble={isDuble} {...props} />
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

PrintPDFComponent.propTypes = {
  data: PropTypes.shape({
    productList: PropTypes.array,
  }),
  type: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  namesType: PropTypes.string.isRequired,
  companysName: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default PrintPDFComponent;
