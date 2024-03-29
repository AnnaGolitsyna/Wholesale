import React, { useRef } from 'react';
//import PropTypes from 'prop-types'
import { Button } from 'antd';
import { ConfigProvider } from 'antd';
import { useReactToPrint } from 'react-to-print';
import TableToPrint from '../table/TableToPrint';
import HeaderToPrint from '../header/HeaderToPrint';

const PrintPDFComponent = ({ data, columns, title }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { margin: 40px }`,
  });

  return (
    <>
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
            <HeaderToPrint title={title} />
            <TableToPrint data={data} columns={columns} />
          </div>
        </div>
      </ConfigProvider>
      <Button type="primary" onClick={handlePrint}>
        Печать
      </Button>
    </>
  );
};

//PrintPDFComponent.propTypes = {}

export default PrintPDFComponent;
