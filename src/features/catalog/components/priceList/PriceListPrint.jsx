import React from 'react';
import PropTypes from 'prop-types'
import { useReactToPrint } from 'react-to-print';

import TableToPrint from './TableToPrint';


const PriceListPrint = ({ data, contractorslist }) => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div ref={componentRef}>
        <TableToPrint
          data={data}
          contractorslist={contractorslist}
        />
      </div>

      <button onClick={handlePrint}>Print</button>
    </>
  );
};

PriceListPrint.propTypes = {
  data: PropTypes.array.isRequired,
  contractorslist: PropTypes.array,
};

export default PriceListPrint;
