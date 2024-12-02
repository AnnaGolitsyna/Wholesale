import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Space, Result, Divider } from 'antd';
import PrintPDFComponent from '../printComponent/PrintPDFComponent';
import PuzzleCheckbox from '../puzzleCheckbox/PuzzleCheckbox';
import SkeletonPrintModal from '../skeleton/SkeletonPrintModal.jsx';
import CompanyNameFormatter from '../companyNameFormatter/CompanyNameFormatter';
import { getColumnsToPrint } from '../../utils/getColumnsToPrint.js';
import { ReactComponent as ModifyPDFIcon } from '../../../../styles/icons/tools/ModifyPDFIcon.svg';
import {FORM_TYPES} from '../../../../constants/formTypes';

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
  const [selectedFieldsList, setSelectedFieldsList] = useState([]);
  const [namesType, setNamesType] = useState('shortName');

  useEffect(() => {
    setSelectedFieldsList([...requiredFieldsList, ...defaultCheckedValues]);
  }, [requiredFieldsList, defaultCheckedValues]);

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
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <ModifyPDFIcon />
        <Divider type="vertical" />
        <Typography.Title level={3} align="center">
          Моделирование документа для печати
        </Typography.Title>
      </Space>

      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        {type === FORM_TYPES.PRINT_INVOICE && <CompanyNameFormatter onChange={onChange} />}

        <PuzzleCheckbox
          options={optionsList}
          checkedValues={selectedFieldsList}
          onChange={onChangeCheckbox}
        />
      </Space>

      <PrintPDFComponent
        data={data}
        type={type}
        columns={customColumns}
        namesType={namesType}
        companysName={companysName}
        title={title}
      />
    </>
  );
};

ModifyingForm.propTypes = {
  data: PropTypes.shape({
    productList: PropTypes.array,
  }),
  type: PropTypes.string.isRequired,
  companysName: PropTypes.shape({}),
  defaultCheckedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  requiredFieldsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

ModifyingForm.defaultProps = {
  companysName: {},
  loading: false,
  error: null,
};

export default ModifyingForm;
