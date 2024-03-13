import React, { useState, useRef } from 'react';
//import PropTypes from 'prop-types'
import { Button, Checkbox, Divider, Space } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { getPriceListColumns } from '../../../../pages/Goods/utils/getPriceListColumns';
import TableToPrint from '../table/TableToPrint'


const PrintPDFComponent = ({ data }) => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = getPriceListColumns(data);

  return (
    <>

      <Button type="primary" onClick={handlePrint}>
        Печать
      </Button>
      <div ref={componentRef}>
        <TableToPrint data={data} columns={columns} />
      </div>
    </>
  );
};

//PrintPDFComponent.propTypes = {}

export default PrintPDFComponent ;
