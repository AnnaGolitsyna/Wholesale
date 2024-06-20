import { myCompanysData } from '../constants/companysData';

const getDataByCorrectId = (companysData, originalId) => {
  const data = {};

  if (companysData.id !== originalId && companysData.id !== myCompanysData.id) {
    const originalData = companysData.relatedCompanies?.find(
      ({ id }) => id === originalId
    );

    Object.assign(data, originalData);
  } else {
    Object.assign(data, companysData);
  }

  return data;
};

export { getDataByCorrectId };
