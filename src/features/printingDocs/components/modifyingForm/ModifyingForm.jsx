import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Space } from 'antd';
import PrintPDFComponent from '../printComponent/PrintPDFComponent';
import PuzzleCheckbox from '../puzzleCheckbox/PuzzleCheckbox';
import CompanyNameFormatter from '../companyNameFormatter/CompanyNameFormatter';
import { myCompanysData } from '../../../../constants/companysData';
import { dataToPrint } from './printFields.js';
import { getColumnsToPrint } from '../../utils/getColumnsToPrint.js';

//import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import { db } from '../../../../config/firestore';

import { doc, getDoc, getDocs } from 'firebase/firestore';

const ModifyingForm = ({ data, type }) => {
  const [checkedValues, setCheckedValues] = useState(
    dataToPrint.priceList.fields.checkedValues
  );

  const [namesType, setNamesType] = useState('shortName');

  // const [value, loading, error] = useCollection(
  //   collection(getFirestore(db), 'printDocs'),

  // );

  // console.log('fb', value, loading, error);

  // const fetching = async () => {
  //  const querySnapshot = await getDocs(collection(db, 'payments'));
  //  querySnapshot.forEach((doc) => {
  //    // doc.data() is never undefined for query doc snapshots
  //    console.log(doc.id, ' => ', doc.data());
  //  });
  // };

  // fetching();

  const selectedFields = [
    ...checkedValues,
    ...dataToPrint.priceList.fields.requiredFieldsList,
  ];

  const customColumns = getColumnsToPrint(data, type, selectedFields);

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
  type: PropTypes.string.isRequired,
};

export default ModifyingForm;
