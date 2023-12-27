import React from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'antd';
import TableToPrint from '../tableToPrint/TableToPrint';

const PriceListPrint = ({ data, contractorslist }) => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Button type='primary' onClick={handlePrint}>Print</Button>
      <div ref={componentRef}>
        <TableToPrint data={data} contractorslist={contractorslist} />
      </div>

    </>
  );
};

PriceListPrint.propTypes = {
  data: PropTypes.array.isRequired,
  contractorslist: PropTypes.array,
};

export default PriceListPrint;
