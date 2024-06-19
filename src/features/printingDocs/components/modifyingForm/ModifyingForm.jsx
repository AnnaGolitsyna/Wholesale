import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Space, Result } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallbackModal from '../../../../components/errors/ErrorFallbackModal.jsx';
import PrintPDFComponent from '../printComponent/PrintPDFComponent';
import PuzzleCheckbox from '../puzzleCheckbox/PuzzleCheckbox';
import SkeletonPrintModal from '../skeleton/SkeletonPrintModal.jsx';
import CompanyNameFormatter from '../companyNameFormatter/CompanyNameFormatter';
import { getColumnsToPrint } from '../../utils/getColumnsToPrint.js';
//import usePrintCollectionOnce from '../../api/usePrintCollectionOnce.js';

const ModifyingForm = ({
  data,
  type,
  companysName,
  defaultCheckedValues,
  requiredFieldsList,
  optionsList,
  title,
  loading,
  error,
}) => {
  // const {
  //   companysName,
  //   defaultCheckedValues = [],
  //   requiredFieldsList = [],
  //   optionsList,
  //   title,
  //   btnText,
  //   loading,
  //   error,
  // } = usePrintCollectionOnce(type);
  const [selectedFieldsList, setSelectedFieldsList] = useState([]);
  const [namesType, setNamesType] = useState('shortName');

  useEffect(() => {
    setSelectedFieldsList([...requiredFieldsList, ...defaultCheckedValues]);
  }, []);

  console.log(
    'props',
    companysName,
    defaultCheckedValues,
    requiredFieldsList,
    optionsList,
    title,
    type,
    loading,
    error,
    data
  );

  if (loading) return <SkeletonPrintModal />;

  if (error) {
    return <Result status="warning" title="Firebase error" subTitle={error} />;
  }

  const onChange = (e) => {
    setNamesType(e.target.value);
  };

  const onChangeCheckbox = (newValues) => {
    setSelectedFieldsList([...requiredFieldsList, ...newValues]);
  };

  const customColumns = getColumnsToPrint(data, type, selectedFieldsList);

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
  // data: PropTypes.array.isRequired,
  // type: PropTypes.string.isRequired,
};

export default withErrorBoundary(ModifyingForm, {
  FallbackComponent: ErrorFallbackModal,
  onError(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error);
    console.error('Error details:', errorInfo.componentStack);
  },
});
