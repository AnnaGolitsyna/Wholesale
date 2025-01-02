import { getDataByCorrectId } from '../../../utils/getDataByCorrectId';
export const getCompanyName = (companysData, type, originalId) => {
  if (!companysData) return null;

  const data = getDataByCorrectId(companysData, originalId);

  const titleOptions = {
    shortName: [
      {
        name: data.name,
      },
      {
        name: data.phone || '',
        label: 'тел',
      },
    ],
    fullName: [
      {
        name: data.fullName,
      },
      {
        name: data.taxNumber || '',
        label: 'код ЕДРПОУ',
      },
      {
        name: data.address || '',
        label: 'адреса',
      },
      {
        name: data.phone || '',
        label: 'тел',
      },
      {
        name: data.email || '',
        label: 'email',
      },
    ],
  };

  return titleOptions[type];
};
