import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { Button, Checkbox } from 'antd';
import TableToPrint from '../tableToPrint/TableToPrint';
import { getColumns } from '../tableToPrint/getColumns';

const PriceListPrint = ({ data, contractorslist }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = getColumns(contractorslist);
  const [customColumns, setcustomColumns] = useState(columns);
  const [checkedValues, setCheckedValues] = useState(['superBulk', 'bulk']);

  const onChange = (newValues) => {
    console.log('checked = ', newValues);
    setCheckedValues(newValues);
  };
  //const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    {
      label: 'Показать закупку',
      value: 'cost',
    },
    {
      label: 'Показать кр.опт',
      value: 'superBulk',
    },
    {
      label: 'Показать опт',
      value: 'bulk',
    },
  ];

  console.log('print', checkedValues, customColumns);
  return (
    <>
      <Button type="primary" onClick={handlePrint}>
        Print
      </Button>
      <Checkbox.Group
        options={options}
        defaultValue={checkedValues}
        onChange={onChange}
      />
      <div ref={componentRef}>
        <TableToPrint data={data} columns={customColumns} />
      </div>
    </>
  );
};

PriceListPrint.propTypes = {
  data: PropTypes.array.isRequired,
  contractorslist: PropTypes.array,
};

export default PriceListPrint;
