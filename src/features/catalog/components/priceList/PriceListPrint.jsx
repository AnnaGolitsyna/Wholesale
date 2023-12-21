import React from 'react';
//import PropTypes from 'prop-types'
import { useReactToPrint } from 'react-to-print';
import { ConfigProvider } from 'antd';
import CatalogTable from '../table/CatalogTable';
import TableToPrint from './TableToPrint';

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { data, contractorslist } = props;
  console.log('print', data);
  return (
    <div ref={ref}>
      {/* <CatalogTable
        data={data}
        columns={columns}
        nestedColumns={nestedColumns}
      /> */}
      <TableToPrint {...props} />
    </div>
  );
});

const PriceListPrint = (props) => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <ComponentToPrint {...props} ref={componentRef} />
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

//PriceListPrint.propTypes = {}

export default PriceListPrint;
