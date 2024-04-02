// import { Input, DatePicker, Checkbox, Typography } from 'antd';
// import ClientIcon from '../../../../styles/icons/ClientIcon';

// const getAdditionalFieldsForContractorsFormList = (form, actionType) => {
//   const titleText = {
//     create: 'Создание нового посредника',
//     edit: 'Редактирование посредника',
//   };

//   return [
//     {
//       name: 'title',
//       children: [
//         {
//           name: 'iconTitle',
//           component: <ClientIcon style={{ fontSize: 60 }} />,
//         },
//         {
//           name: 'dynamicTitle',
//           component: (
//             <Typography.Title level={3}>
//               {titleText[actionType] || 'Просмотр информации'}
//             </Typography.Title>
//           ),
//         },
//       ],
//     },

//     {
//       name: 'nameId',
//       children: [
//         {
//           name: 'name',
//           label: 'Наименование',
//           component: <Input placeholder="сокращенное имя компании" />,
//           rules: [{ required: true, message: 'Заполните обязательное поле' }],
//           hasFeedback: true,
//         },
//         {
//           name: 'id',
//           label: 'ID',
//           component: <Input disabled />,
//         },
//       ],
//     },

//     {
//       name: 'fullName',
//       label: 'Полное наименование',
//       component: (
//         <Input.TextArea
//           placeholder="полное наименование компании (для документов)"
//           rows={2}
//         />
//       ),
//       rules: [{ required: true, message: 'Заполните обязательное поле' }],
//       hasFeedback: true,
//     },

//     {
//       name: 'taxNumber',
//       label: 'Код ОКППО/ИНН',
//       tooltip: 'Налоговый код',
//       rules: [
//         {
//           type: 'number',
//           message: 'Введите только числа',
//           validator: (rule, value) => {
//             if (!value || /^[0-9]+$/.test(value)) {
//               return Promise.resolve();
//             }
//             return Promise.reject('Введите только числа');
//           },
//         },
//       ],
//       component: <Input placeholder="налоговый код" />,
//     },

//     {
//       name: 'contract',
//       children: [
//         {
//           name: 'contractNumber',
//           label: 'Договор №',
//           component: (
//             <Input
//               placeholder="номер договора"
//               style={{
//                 width: '100%',
//               }}
//             />
//           ),
//         },

//         {
//           name: 'date',
//           label: 'от',
//           component: (
//             <DatePicker
//               placeholder="дата"
//               format="YYYY-MM-DD"
//               style={{
//                 width: '100%',
//               }}
//             />
//           ),
//         },

//         {
//           name: 'active',
//           valuePropName: 'checked',
//           component: (
//             <Checkbox
//               style={{
//                 width: '100%',
//               }}
//             >
//               Активный
//             </Checkbox>
//           ),
//         },
//       ],
//     },
//   ];
// };

// export { getAdditionalFieldsForContractorsFormList };
