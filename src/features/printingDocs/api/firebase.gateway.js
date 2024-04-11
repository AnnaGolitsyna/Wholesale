import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import { myCompanysData } from '../../../constants/companysData';

const usePrintCollectionOnce = (type) => {
  const priceListRef = collection(db, 'balanutsa', 'dataToPrint', type);
  const [snapshot, loading, error] = useCollectionOnce(priceListRef);

  if (loading) return { loading };
  if (error) return { error };

  //console.log('fb', snapshot, loading, error);
  if (snapshot) {
    //  const test = snapshot.docs.map((doc) => {
    //     console.log(doc.id, '=>', doc.data());
    //     return doc.data();
    //   });
    const dataToPrint = snapshot.docs.reduce((acc, doc) => {
      // console.log(doc.id, '=>', doc.data());
      return { ...acc, [doc.id]: doc.data() };
    }, {});

    // console.log('dataToPrint', dataToPrint);
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
};

export default usePrintCollectionOnce;
