import { InputNumber, Input, Statistic } from 'antd';


export const getProductListColumns = (form) => {
  return [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'В реализации',
      dataIndex: 'dateStart',
      key: 'dateStart',
    },
    {
      title: 'Цена',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',
      editable: true,
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      editable: true,

      // render: (_, record) => (
      //   <InputNumber
      //     defaultValue={record.count}
      //     min={0}
      //     onChange={(value) => {
      //       console.log('changed', record, value, value * record.selectedPrice);

      //       form.setFieldsValue({
      //         count: value,
      //         sumRow: value * record.selectedPrice,
      //       });
      //     }}
      //   />
      // ),
    },
    {
      title: 'Сумма',
      dataIndex: 'sumRow',
      key: 'sumRow',

      // render: (_, record) => (
      //   <Statistic precision={2} value={record.sumRow}  />
      //     // min={0}
      //     // onChange={(value) => {
      //     //  const newsumRow
      //     //   form.setFieldsValue({
      //     //     count: record.count,
      //     //   });
      //     // }}

      // ),
    },
  ];
};
