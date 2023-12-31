import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { Button, Checkbox, Divider, Space } from 'antd';
import dayjs from 'dayjs';
import TableToPrint from '../../../../components/tableToPrint/TableToPrint';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import { getPriceListColumns } from '../../utils/goods/getPriceListColumns';
import PuzzleIcon from '../../../../styles/icons/PuzzleIcon';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';
import { optionsCheckbox } from './optionsCheckbox';

const PriceListPrint = ({ data }) => {
  const [checkedValues, setCheckedValues] = useState([
    'superBulk',
    'bulk',
    'supplier',
  ]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const contractorList = useContractorsListSelect();

  const onChange = (newValues) => {
    setCheckedValues(newValues);
  };

  const columns = getPriceListColumns(contractorList);
  const requiredFieldsList = ['name', 'dateStart', 'retail'];

  const customColumns = columns.filter(
    ({ dataIndex }) =>
      requiredFieldsList.includes(dataIndex) ||
      checkedValues.includes(dataIndex)
  );

  const getTitle = () => `Прайс-лист от ${getShortDateFormat(dayjs())}`

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
            options={optionsCheckbox}
            defaultValue={checkedValues}
            onChange={onChange}
          />
        </Space>
      </Space>
      <Divider />
      <div ref={componentRef}>
        <TableToPrint data={data} columns={customColumns} getTitle={getTitle} />
      </div>
    </>
  );
};

PriceListPrint.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PriceListPrint;
