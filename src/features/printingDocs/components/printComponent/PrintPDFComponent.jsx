import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { ConfigProvider } from 'antd';
import { useReactToPrint } from 'react-to-print';
import TableToPrint from '../table/TableToPrint';
import HeaderToPrint from '../header/HeaderToPrint';


const PrintPDFComponent = ({
  data,
  columns,
  namesType,
  companysName,
  title,
}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { margin: 40px }`,
  });

  return (
    <>
      <Button
        type="primary"
        onClick={handlePrint}
        style={{ marginLeft: '85%' }}
      >
        Печать
      </Button>
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
            <HeaderToPrint
              namesType={namesType}
              companysName={companysName}
              title={title}
            />
            <TableToPrint data={data} columns={columns} />
          </div>

        </div>
      </ConfigProvider>
    </>
  );
};

PrintPDFComponent.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  namesType: PropTypes.string.isRequired,
  companysName: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default PrintPDFComponent;
