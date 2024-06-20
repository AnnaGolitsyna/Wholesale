import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Radio,
  ConfigProvider,
  Divider,
  Space,
  Typography,
} from 'antd';
import { useReactToPrint } from 'react-to-print';
import TableToPrint from '../table/TableToPrint';
import InvoiceHeader from '../header/InvoiceHeader';
import FooterToPrint from '../footerToPrint/FooterToPrint';
import PriceListHeader from '../header/PriceListHeader';
//import { useGetContractorByIdQuery } from '../../../../pages/Contractors';

const PrintPDFComponent = ({
  data,
  type,
  columns,
  namesType,
  companysName,
  title,
}) => {
  const [isDuble, setIsDuble] = useState(false);
  // const { data: contractor } = useGetContractorByIdQuery(data.name.value);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { margin: 40px }`,
  });

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
        <Button type="primary" onClick={handlePrint}>
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
            {type === 'priceList' ? (
              <PriceListHeader title={title} />
            ) : (
              <InvoiceHeader
                namesType={namesType}
                companysName={companysName}
                title={title}
                contractor={data.name}
              />
            )}

            <TableToPrint data={data.productList} columns={columns} />
            {type === 'invoice' && (
              <FooterToPrint sum={data.sum} companysName={companysName} />
            )}
            {isDuble && type === 'invoice' && (
              <>
                <Divider />
                <InvoiceHeader
                  namesType={namesType}
                  companysName={companysName}
                  title={title}
                  contractor={data.name}
                />
                <TableToPrint data={data.productList} columns={columns} />
                <FooterToPrint sum={data.sum} companysName={companysName} />
              </>
            )}
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
