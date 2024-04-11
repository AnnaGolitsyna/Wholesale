import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Space } from 'antd';
import PrintPDFComponent from '../printComponent/PrintPDFComponent';
import PuzzleCheckbox from '../puzzleCheckbox/PuzzleCheckbox';
import CompanyNameFormatter from '../companyNameFormatter/CompanyNameFormatter';
import { myCompanysData } from '../../../../constants/companysData';
import { dataToPrint } from './printFields.js';
import { getColumnsToPrint } from '../../utils/getColumnsToPrint.js';

import usePrintCollectionOnce from '../../api/firebase.gateway.js';

import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import { db } from '../../../../config/firestore';

import { doc, getDoc, getDocs } from 'firebase/firestore';

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
  const [selectedFieldsList, setSelectedFieldsList] =
    useState(defaultCheckedValues);
  const [namesType, setNamesType] = useState('shortName');

  console.log(defaultCheckedValues, requiredFieldsList, [
    ...requiredFieldsList,
    ...defaultCheckedValues,
  ]);

  useEffect(() => {
    if (defaultCheckedValues.length > 0) {
      setSelectedFieldsList([...requiredFieldsList, ...defaultCheckedValues]);
    }
  }, [title]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Early return for error state
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // const selectedFields = [...checkedValues, ...requiredFieldsList];

  const customColumns = getColumnsToPrint(data, type, selectedFieldsList);

  const onChange = (e) => {
    setNamesType(e.target.value);
  };

  const onChangeCheckbox = (newValues) => {
    // setCheckedValues(newValues);
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

//  const [checkedValues, setCheckedValues] = useState(
//     dataToPrint.priceList.fields.checkedValues
//   );

//   const [namesType, setNamesType] = useState('shortName');

//   const {
//    // companysName,
//     defaultCheckedValues,
//     requiredFieldsList,
//     optionsList,
//     title,
//   } = usePrintCollectionOnce(type);

//   useEffect(() => {
//     console.log(
//       'hookData',
//       defaultCheckedValues,
//       requiredFieldsList,
//       optionsList,
//       title
//     );
//   }, [title]);

//   const selectedFields = [
//     ...checkedValues,
//     ...dataToPrint.priceList.fields.requiredFieldsList,
//   ];

//   const customColumns = getColumnsToPrint(data, type, selectedFields);

//   const onChange = (e) => {
//     setNamesType(e.target.value);
//   };

//   const onChangeCheckbox = (newValues) => {
//     setCheckedValues(newValues);
//   };

//   const companysName = {
//     sender:
//       dataToPrint.priceList.companysName.sender === 'userName'
//         ? myCompanysData
//         : null,
//     recipient:
//       dataToPrint.priceList.companysName.recipient === 'userName'
//         ? myCompanysData
//         : null,
//     isShowRole: dataToPrint.priceList.companysName.isShowRole,
//   };

//   return (
//     <>
//       <Typography.Title level={3} align="center">
//         Моделирование документа для печати
//       </Typography.Title>
//       <Space>
//         <CompanyNameFormatter onChange={onChange} />

//         <PuzzleCheckbox
//           options={dataToPrint.priceList.optionsCheckbox}
//           checkedValues={checkedValues}
//           onChange={onChangeCheckbox}
//         />
//       </Space>

//       <PrintPDFComponent
//         data={data}
//         columns={customColumns}
//         namesType={namesType}
//         companysName={companysName}
//         title={dataToPrint.priceList.title}
//       />
//     </>
//   );
