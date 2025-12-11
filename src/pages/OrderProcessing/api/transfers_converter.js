import { getShortDateFormat } from '../../../utils/dateUtils';

const transferConverter = {
  toFirestore(value) {
    console.log('value', value);

    // ✅ Only include the specific fields we want to save
    return {
      date: getShortDateFormat(value.date),
      timestamp: value.timestamp,
      contractor: value.contractor,
      items: value.items,
      docNumber: value.docNumber,
      docType: value.docType,
      scedule: value.scedule, // Include schedule type
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      key: snapshot.id,
    };
  },
};

export default transferConverter;
