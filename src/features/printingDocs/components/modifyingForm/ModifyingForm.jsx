import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { Button, Checkbox, Divider, Space, Radio } from 'antd';
import PrintPDFComponent from '../printComponent/PrintPDFComponent';
import { getPriceListColumns } from '../../../../pages/Goods/utils/getPriceListColumns';
import { getTitle } from '../../utils/getTitle';
import { myCompanysData } from '../../../../constants/companysData';

const { shortName, fullName } = getTitle(myCompanysData);
const ModifyingForm = ({ data }) => {
  const [nameTitle, setNameTitle] = useState(shortName);
  const columns = getPriceListColumns(data);

  const onChange = (e) => {
    if (e.target.value === 'full') {
      setNameTitle(fullName);
    } else {
      setNameTitle(shortName);
    }
  };
  return (
    <>
      <Radio.Group onChange={onChange} defaultValue={'short'}>
        <Radio value={'short'}>Краткий формат</Radio>
        <Radio value={'full'}>Полный формат</Radio>
      </Radio.Group>
      <PrintPDFComponent data={data} columns={columns} title={nameTitle} />
    </>
  );
};

//ModifyingForm.propTypes = {};

export default ModifyingForm;
