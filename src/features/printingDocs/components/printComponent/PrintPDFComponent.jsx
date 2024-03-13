import React, { useState, useRef } from 'react';
//import PropTypes from 'prop-types'
import { Button, Checkbox, Divider, Space, Radio } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { getPriceListColumns } from '../../../../pages/Goods/utils/getPriceListColumns';
import TableToPrint from '../table/TableToPrint';
import HeaderToPrint from '../header/HeaderToPrint';
import { getTitle } from '../../utils/getTitle';

const PrintPDFComponent = ({ data }) => {
  const [nameTitle, setNameTitle] = useState(null);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = getPriceListColumns(data);

  const { shortName, fullName } = getTitle();
  const onChange = (e) => {
    if (e.target.value === 'full') {
      setNameTitle(fullName);
    } else {
      setNameTitle(shortName);
    }
  };
  console.log('pdf data', data);

  return (
    <>
      <Radio.Group onChange={onChange}>
        <Radio value={'short'}>Краткий формат</Radio>
        <Radio value={'full'}>Полный формат</Radio>
      </Radio.Group>
      <div ref={componentRef} style={{ margin: 20 }}>
        <HeaderToPrint title={nameTitle} />
        <TableToPrint data={data} columns={columns} />
      </div>
      <Button type="primary" onClick={handlePrint}>
        Печать
      </Button>
    </>
  );
};

//PrintPDFComponent.propTypes = {}

export default PrintPDFComponent;
