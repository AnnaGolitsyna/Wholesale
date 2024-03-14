
export const getTitle = (companysData) => {
  const titleOptions = {
    shortName: [
      {
        name: companysData.name,
      },
      {
        name: companysData.phone,
        label: 'тел',
      },
    ],
    fullName: [
      {
        name: companysData.fullName,
      },
      {
        name: companysData.taxNumber,
        label: 'код ЕДРПОУ',
      },
      {
        name: companysData.address,
        label: 'адреса',
      },
      {
        name: companysData.phone,
        label: 'тел',
      },
      {
        name: companysData.email,
        label: 'email',
      },
    ],
  };

  return titleOptions;
};
