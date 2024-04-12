import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Space } from 'antd';
import PrintPDFComponent from '../printComponent/PrintPDFComponent';
import PuzzleCheckbox from '../puzzleCheckbox/PuzzleCheckbox';
import CompanyNameFormatter from '../companyNameFormatter/CompanyNameFormatter';
import { getColumnsToPrint } from '../../utils/getColumnsToPrint.js';
import usePrintCollectionOnce from '../../api/firebase.gateway.js';

import SceletonPrintModal from '../skeleton/SceletonPrintModal.jsx';


const ModifyingForm = ({ data, type }) => {
  // const [checkedValues, setCheckedValues] = useState([]);
  const {
    companysName,
    defaultCheckedValues = [],
    requiredFieldsList = [],
    optionsList,
    title,
    loading,
    error,
  } = usePrintCollectionOnce(type);
  const [selectedFieldsList, setSelectedFieldsList] = useState([]);
  const [namesType, setNamesType] = useState('shortName');

  useEffect(() => {
    if (defaultCheckedValues.length > 0) {
      setSelectedFieldsList([...requiredFieldsList, ...defaultCheckedValues]);
    }
  }, [title]);

  if (loading) {
    return (
     <SceletonPrintModal />
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const customColumns = getColumnsToPrint(data, type, selectedFieldsList);

  const onChange = (e) => {
    setNamesType(e.target.value);
  };

  const onChangeCheckbox = (newValues) => {
    setSelectedFieldsList([...requiredFieldsList, ...newValues]);
  };

  return (
    <>
      <Typography.Title level={3} align="center">
        Моделирование документа для печати
      </Typography.Title>
      <Space>
        <CompanyNameFormatter onChange={onChange} />

        <PuzzleCheckbox
          options={optionsList}
          checkedValues={selectedFieldsList}
          onChange={onChangeCheckbox}
        />
      </Space>

      <PrintPDFComponent
        data={data}
        columns={customColumns}
        namesType={namesType}
        companysName={companysName}
        title={title}
      />
    </>
  );
};

ModifyingForm.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default ModifyingForm;


