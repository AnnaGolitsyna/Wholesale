import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { Button, Checkbox, Typography, Space, Radio } from 'antd';
import PrintPDFComponent from '../printComponent/PrintPDFComponent';
import { getPriceListColumns } from '../../../../pages/Goods/utils/getPriceListColumns';
import { getTitle } from '../../utils/getTitle';
import { myCompanysData } from '../../../../constants/companysData';
import PuzzleCheckbox from '../puzzleCheckbox/PuzzleCheckbox';

import FormattedCompanyData from '../formattedCompanyData/FormattedCompanyData';

const optionsCheckbox = [
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

const { shortName, fullName } = getTitle(myCompanysData);

const ModifyingForm = ({ data }) => {
  const [checkedValues, setCheckedValues] = useState([
    'superBulk',
    'bulk',
    'supplier',
  ]);

  const [nameTitle, setNameTitle] = useState(shortName);
  const columns = getPriceListColumns(data);

  const requiredFieldsList = ['name', 'dateStart', 'retail'];

  const customColumns = columns.filter(
    ({ dataIndex }) =>
      requiredFieldsList.includes(dataIndex) ||
      checkedValues.includes(dataIndex)
  );

  const onChange = (e) => {
    if (e.target.value === 'full') {
      setNameTitle(fullName);
    } else {
      setNameTitle(shortName);
    }
  };

  const onChangeCheckbox = (newValues) => {
    setCheckedValues(newValues);
  };
  return (
    <>
      <Typography.Title level={3} align="center">
        Моделирование документа для печати
      </Typography.Title>
      <Space>
        <FormattedCompanyData onChange={onChange} />

        <PuzzleCheckbox
          options={optionsCheckbox}
          checkedValues={checkedValues}
          onChange={onChangeCheckbox}
        />
      </Space>

      <PrintPDFComponent
        data={data}
        columns={customColumns}
        title={nameTitle}
      />
    </>
  );
};

//ModifyingForm.propTypes = {};

export default ModifyingForm;
