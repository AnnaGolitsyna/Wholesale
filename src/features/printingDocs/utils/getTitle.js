import { companysData } from '../../../constants/companysData';

//   name: 'ФОП Балануца Н.В.',
//   fullName: 'ФОП "Балануца Наталія Василівна',
//   inn: '2624412068',
//   address: '25006, м. Кропивницький, вул. Тарковського, 76/3',
//   phone: '050-698-14-70',
//   email: 'balanutsa.nv@gmail.com',

export const getTitle = () => {
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
        name: companysData.inn,
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
