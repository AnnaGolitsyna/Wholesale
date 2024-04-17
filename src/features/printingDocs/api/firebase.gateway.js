import React, { useEffect } from 'react';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import { Button, Result } from 'antd';
import { myCompanysData } from '../../../constants/companysData';

const usePrintCollectionOnce = (type) => {
  const priceListRef = collection(db, 'balanutsa', 'dataToPrint', type);
  const [snapshot, loading, error] = useCollectionOnce(priceListRef);

  if (loading) return { loading };
  if (error) return { error };

  console.log('fb', snapshot, loading, error);

  try {
    if (snapshot) {
      const dataToPrint = snapshot.docs.reduce((acc, doc) => {
        return { ...acc, [doc.id]: doc.data() };
      }, {});

      const {
        names: { sender, recipient, isShowRole },
        fields: { checkedValues: defaultCheckedValues, requiredFieldsList },
        options: { optionsCheckbox: optionsList },
        title: { text: title },
      } = dataToPrint;

      const companysName = {
        sender: sender === 'userName' ? myCompanysData : null,
        recipient: recipient === 'userName' ? myCompanysData : null,
        isShowRole: isShowRole,
      };

      return {
        companysName,
        defaultCheckedValues,
        requiredFieldsList,
        optionsList,
        title,
      };
    }
  } catch (err) {
    console.log('err', err);
    throw new Error('failed to get data', err);
  }
};

export default usePrintCollectionOnce;
