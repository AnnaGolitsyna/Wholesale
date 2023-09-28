const contractorsList = [
  {
    key: '1',
    name: 'Пресс-Курьер',
    fullName: `ТОВ "Пресс-Кур'єр Україна"`,
    category: 'supplier',
    categoryPrice: '',
    taxNumber: '34494387',
    contractNumber: '81/D',
    contractDate: '',
    email: '',
    phone: '044-495-48-43',
    adress: '04053, м.Київ, пров.Киянівський, буд.3-7',
    active: true,
  },
  {
    key: '2',
    name: 'Зенит',
    fullName: `ФОП Босенко`,
    category: 'supplier',
    categoryPrice: '',
    taxNumber: '',
    contractNumber: '',
    contractDate: '',
    email: '',
    phone: '',
    adress: 'м.Запоріжжя',
    active: true,
  },
  {
    key: '3',
    name: 'Мостовой',
    fullName: `ФОП Мостовой`,
    category: 'all-purpose',
    categoryPrice: '',
    taxNumber: '',
    contractNumber: '',
    contractDate: '',
    email: '',
    phone: '',
    adress: 'м.Кропивницький',
    active: true,
  },
  {
    key: '4',
    name: 'Винниченко',
    fullName: `ФОП Винниченко`,
    category: 'buyer',
    categoryPrice: 'bulk',
    taxNumber: '',
    contractNumber: '',
    contractDate: '',
    email: '',
    phone: '',
    adress: 'м.Кропивницький',
    active: true,
  },
  {
    key: '5',
    name: 'Жданова',
    fullName: `ФОП Жданова`,
    category: 'all-purpose',
    categoryPrice: '',
    taxNumber: '',
    contractNumber: '',
    contractDate: '',
    email: '',
    phone: '',
    adress: 'м.Кропивницький',
    active: false,
  },
];



export { contractorsList };

// --------------------
// Arrays to save

// const array1 = [1, 2, 3, 4, 5];
// const array2 = ["apple", "banana", "cherry"];

// // Convert arrays to JSON strings and store in local storage

// localStorage.setItem("array1", JSON.stringify(array1));
// localStorage.setItem("array2", JSON.stringify(array2));

// Retrieve JSON strings from local storage and parse them into arrays

// const storedArray1 = JSON.parse(localStorage.getItem("array1"));
// const storedArray2 = JSON.parse(localStorage.getItem("array2"));

// // Check if data exists in local storage

// if (storedArray1 && storedArray2) {
//   console.log("Array 1:", storedArray1);
//   console.log("Array 2:", storedArray2);
// } else {
//   console.log("Data not found in local storage.");
// }