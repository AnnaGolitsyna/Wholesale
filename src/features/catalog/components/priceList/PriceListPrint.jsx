import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { Button, Checkbox, Divider, Space } from 'antd';
import TableToPrint from '../tableToPrint/TableToPrint';
import { getColumns } from '../tableToPrint/getColumns';
import PuzzleIcon from '../../../../styles/icons/PuzzleIcon';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';

const PriceListPrint = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const contractorList = useContractorsListSelect();
  const columns = getColumns(contractorList);

  const [checkedValues, setCheckedValues] = useState([
    'superBulk',
    'bulk',
    'supplier',
  ]);

  const requiredFieldsList = ['name', 'dateStart', 'retail'];

  const onChange = (newValues) => {
    setCheckedValues(newValues);
  };

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

  return (
    <>
      <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button type="primary" onClick={handlePrint}>
          Печать
        </Button>
        <Divider type="vertical" />
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
  
};

export default PriceListPrint;
