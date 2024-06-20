export const getCompanyName = (companysData, type) => {
  if (!companysData) return null;

  const titleOptions = {
    shortName: [
      {
        name: companysData.fullName,
      },
      {
        name: companysData.phone || '',
        label: 'тел',
      },
    ],
    fullName: [
      {
        name: companysData.fullName,
      },
      {
        name: companysData.taxNumber || '',
        label: 'код ЕДРПОУ',
      },
      {
        name: companysData.address || '',
        label: 'адреса',
      },
      {
        name: companysData.phone || '',
        label: 'тел',
      },
      {
        name: companysData.email || '',
        label: 'email',
      },
    ],
  };

  return titleOptions[type];
};
