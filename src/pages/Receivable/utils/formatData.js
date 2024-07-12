const formatData = (contractors, receivables) => {
  if (!contractors || !receivables) return [];

  return contractors.reduce((acc, contractor) => {
    if (contractor.relatedCompanies.length) {
      const relCom = contractor.relatedCompanies.map((el) => {
        const matchingReceivable = receivables.find(
          (receivable) => el.id === receivable.name.value
        );
        const updatedReceivable = matchingReceivable
          ? {
              ...matchingReceivable,
              ...el,
              receivable: matchingReceivable.debet - matchingReceivable.credit,
              category: contractor.category,
              key: el.id,
            }
          : {
              ...el,
              receivable: null,
              category: contractor.category,
              key: el.id,
            };
        return updatedReceivable;
      });

      console.log('relCom', acc, relCom);
      return [...acc, ...relCom];
    } else {
      const receivable = receivables.find(
        (receivable) => contractor.id === receivable.name.value
      );
      return [
        ...acc,
        {
          ...receivable,
          category: contractor.category,
          name: contractor.name,
          id: contractor.id,
          key: contractor.id,
          receivable: receivable?.debet - receivable?.credit || null,
        },
      ];
    }
  }, []);
};

export { formatData };

// const formatData = (contractors, receivables) => {
//   if (!contractors || !receivables) return [];

//   return contractors.map((contractor) => {
//     if (contractor.relatedCompanies.length) {
//       const contractorMap = new Map(
//         contractor.relatedCompanies.map((company) => [company.id, company])
//       );

//       const matchingReceivable = receivables.find((receivable) =>
//         contractorMap.has(receivable.name.value)
//       );

//       if (matchingReceivable) {
//         const company = contractorMap.get(matchingReceivable.name.value);
//         const updatedReceivable = {
//           ...matchingReceivable,
//           ...company,
//           category: contractor.category,
//         };

//         return {
//           ...updatedReceivable,
//           receivable: updatedReceivable.debet - updatedReceivable.credit,
//           key: contractor.id, // Ensure a unique key for each contractor
//         };
//       } else {
//         console.warn(
//           `No matching receivable found for contractor ${contractor.id}`
//         );
//         return {
//           category: contractor.category,
//           key: contractor.id,
//         };
//       }
//     } else {
//       const receivable = receivables.find(
//         (receivable) => contractor.id === receivable.name.value
//       );

//       if (receivable) {
//         return {
//           ...receivable,
//           category: contractor.category,
//           name: contractor.name,
//           id: contractor.id,
//           receivable: receivable.debet - receivable.credit,
//           key: contractor.id, // Ensure a unique key for each contractor
//         };
//       } else {
//         console.warn(`No receivable found for contractor ${contractor.id}`);
//         return {
//           category: contractor.category,
//           name: contractor.name,
//           id: contractor.id,
//           receivable: '?',
//           key: contractor.id, // Ensure a unique key for each contractor
//         };
//       }
//     }
//   });
// };

// export { formatData };
