import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Space } from 'antd';
import PrintPDFComponent from '../printComponent/PrintPDFComponent';
import PuzzleCheckbox from '../puzzleCheckbox/PuzzleCheckbox';
import CompanyNameFormatter from '../companyNameFormatter/CompanyNameFormatter';
import { getPriceListColumns } from '../../../../pages/Goods/utils/getPriceListColumns';
import { myCompanysData } from '../../../../constants/companysData';
import { dataToPrint } from './printFields.js';



const ModifyingForm = ({ data }) => {
  const [checkedValues, setCheckedValues] = useState(
    dataToPrint.priceList.fields.checkedValues
  );

  const [namesType, setNamesType] = useState('shortName');

  const columns = getPriceListColumns(data);

  const customColumns = columns.filter(
    ({ dataIndex }) =>
      dataToPrint.priceList.fields.requiredFieldsList.includes(dataIndex) ||
      checkedValues.includes(dataIndex)
  );

  const onChange = (e) => {
    setNamesType(e.target.value);
  };

  const onChangeCheckbox = (newValues) => {
    setCheckedValues(newValues);
  };

  const companysName = {
    sender:
      dataToPrint.priceList.companysName.sender === 'userName'
        ? myCompanysData
        : null,
    recipient:
      dataToPrint.priceList.companysName.recipient === 'userName'
        ? myCompanysData
        : null,
    isShowRole: dataToPrint.priceList.companysName.isShowRole,
  };

  return (
    <>
      <Typography.Title level={3} align="center">
        Моделирование документа для печати
      </Typography.Title>
      <Space>
        <CompanyNameFormatter onChange={onChange} />

        <PuzzleCheckbox
          options={dataToPrint.priceList.optionsCheckbox}
          checkedValues={checkedValues}
          onChange={onChangeCheckbox}
        />
      </Space>

      <PrintPDFComponent
        data={data}
        columns={customColumns}
        namesType={namesType}
        companysName={companysName}
        title={dataToPrint.priceList.title}
      />
    </>
  );
};

ModifyingForm.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ModifyingForm;
