import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { Button, Checkbox, Divider, Space } from 'antd';
import TableToPrint from '../tableToPrint/TableToPrint';
import { getColumns } from '../tableToPrint/getColumns';
import PuzzleIcon from '../../../../styles/icons/PuzzleIcon';

const PriceListPrint = ({ data, contractorslist }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = getColumns(contractorslist);
  // const [customColumns, setcustomColumns] = useState(columns);
  const [checkedValues, setCheckedValues] = useState([
    'superBulk',
    'bulk',
    'supplier',
  ]);

  const requiredFieldsList = ['name', 'dateStart', 'retail'];

  const onChange = (newValues) => {
    console.log('checked = ', newValues);
    setCheckedValues(newValues);
  };

  console.log('test', requiredFieldsList);
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
    {
      label: 'Показать поставщика',
      value: 'supplier',
    },
  ];

  const customColumns = columns.filter((column) => {
    if (requiredFieldsList.includes(column.dataIndex)) {
      return true;
    }
    if (checkedValues.includes(column.dataIndex)) {
      return true;
    }
    return false;
  });

  console.log('print', checkedValues, customColumns);
  return (
    <>
      <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button type="primary" onClick={handlePrint}>
          Печать
        </Button>
        <Divider type='vertical'/>
        <Space>
          <PuzzleIcon />
          <Checkbox.Group
            options={options}
            defaultValue={checkedValues}
            onChange={onChange}
          />
        </Space>
      </Space>
      <Divider />
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
