// import { getShortDateFormat } from '../../../utils/dateUtils';

// const receivableConverter = {
//   toFirestore(transaction) {
//     const { date, ...rest } = transaction;
//     console.log('converter', date, transaction);

//     return {
//       ...rest,
//       lastTransaction: date ? getShortDateFormat(date) : null,
//     };
//   },
//   fromFirestore(snapshot, options) {
//     const data = snapshot.data(options);
//     return {
//       ...data,
//       // id: snapshot.id,
//       key: snapshot.id,
//     };
//   },
// };

// export default receivableConverter;
