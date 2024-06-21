import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio, ConfigProvider, Divider, Space } from 'antd';
import { useReactToPrint } from 'react-to-print';
import TableToPrint from '../table/TableToPrint';
import InvoiceHeader from '../header/InvoiceHeader';
import FooterToPrint from '../footerToPrint/FooterToPrint';
import PriceListHeader from '../header/PriceListHeader';

import PriceListContent from '../contentComponent/PriceListContent';
import InvoiceContent from '../contentComponent/InvoiceContent';

const PrintPDFComponent = ({
  data,
  type,
  columns,
  namesType,
  companysName,
  title,
}) => {
  const [isDuble, setIsDuble] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { margin: 40px }`,
  });

  const onChange = (e) => {
    setIsDuble(e.target.value);
  };

  const contentComponent =
    type === 'priceList' ? (
      <PriceListContent data={data} columns={columns} title={title} />
    ) : (
      <InvoiceContent
        data={data}
        columns={columns}
        namesType={namesType}
        companysName={companysName}
        title={title}
        isDuble={isDuble}
      />
    );

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
        {type === 'invoice' && (
          <Radio.Group onChange={onChange} defaultValue={false}>
            <Radio value={false}>1 экз.на листе</Radio>
            <Radio value={true}>2 экз.на лист</Radio>
          </Radio.Group>
        )}
      </Space>

      <ConfigProvider
        theme={{
          inherit: false,
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

            {contentComponent}

          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

PrintPDFComponent.propTypes = {
  data: PropTypes.shape({
    productList: PropTypes.array.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  namesType: PropTypes.string.isRequired,
  companysName: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default PrintPDFComponent;
