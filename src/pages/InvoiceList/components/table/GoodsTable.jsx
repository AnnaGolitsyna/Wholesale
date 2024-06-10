// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useSearchParams } from 'react-router-dom';
// import { Space, Spin, ConfigProvider, theme, Result } from 'antd';
// import { useGetGoodsListQuery } from '../../../Goods';
// import SearchInput from '../../../../components/searchInput/SearchInput';
// import { getColumns } from './getColumns';
// import EditableTable from '../../../../components/editableTable/EditableTable';
// import { getCurrentYearString } from '../../../../utils/dateUtils';
// import { ModalModifyItems } from '../../../../features/modifyingItems';

// import RadioGroupForGoodsTable from '../radioGroup/RadioGroupForGoodsTable';

// const GoodsTable = ({ form }) => {
//   const { data, isLoading, isError, error } = useGetGoodsListQuery(true);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [dataSourceList, setDataSourceList] = useState([]);
//   const [filteredList, setFilteredList] = useState([]);

//   const [searchParams] = useSearchParams();
//   const defaultFilterValue = searchParams.get('supplier');

//   const { token } = theme.useToken();

//   useEffect(() => {
//     setFilteredList(data);
//     setDataSourceList(data);
//   }, [data]);

//   const handleSave = (row) => {
//     console.log('handleSave', row);
//     const newDataSourceList = dataSourceList.map((item) =>
//       item.key === row.key ? row : item
//     );

//     // const newFilteredList = filteredList.map((item) =>
//     //   item.key === row.key ? row : item
//     // );

//     // setFilteredList(newFilteredList);

//     setDataSourceList(newDataSourceList);
//    // form.setFieldsValue({ productList: newFilteredList });
//    // form.setFieldsValue({ productList: newDataSourceList });
//   };

//   const handleFilterChange = (value) => {
//     let filteredDataSourceList;

//     if (value === 'selected') {
//       filteredDataSourceList = dataSourceList.map((item) =>
//         selectedRowKeys.includes(item.key)
//           ? {
//               ...item,
//               count: item.count || 0,
//               number: item.number || getCurrentYearString(),
//             }
//           : item
//       );
//     } else {
//       filteredDataSourceList = dataSourceList;
//     }

//     console.log('filteredDataSourceList', value, filteredDataSourceList);

//     setDataSourceList(filteredDataSourceList);
//     // setFilteredList(
//     //   value === 'selected'
//     //     ? getSelectedItems(filteredDataSourceList)
//     //     : filteredDataSourceList
//     // );
//   };

//   const handleSelectChange = (newSelectedRowKeys) => {
//     console.log('newSelectedRowKeys', newSelectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);
//     const updatedList = dataSourceList.map((item) => {
//       if (newSelectedRowKeys.includes(item.id)) {
//         return {
//           ...item,
//           count: item.count || 0,
//           number: item.number || getCurrentYearString(),
//         };
//       }
//       return item;
//     });

//     console.log('updatedList', updatedList);
//     //setFilteredList(updatedList);
//   };

//   const onSearch = (value) => {
//     const foundItems = data?.filter(({ name }) =>
//       (name.label || name).toLowerCase().includes(value.toLowerCase())
//     );
//     console.log('onSearch', foundItems);
//    // setFilteredList(foundItems);
//   };

//   const defaultColumns = getColumns(data, token, defaultFilterValue);

//   return (
//     <>
//       <Space
//         style={{ margin: 10, display: 'flex', justifyContent: 'space-evenly' }}
//       >
//         <RadioGroupForGoodsTable onFilterChange={handleFilterChange} />
//         <ModalModifyItems data={null} typeData="Goods" actionType="create" />
//         <SearchInput onChange={onSearch} placeholder={'Поиск по товару'} />
//       </Space>
//       {isError ? (
//         <Result
//           status={error.status}
//           title={error.data}
//           subTitle={error.data && <p>Данных не найдено</p>}
//         />
//       ) : (
//         <Spin spinning={isLoading} size="large">
//           <ConfigProvider
//             theme={{
//               inherit: false,
//               components: {
//                 Table: {
//                   colorBgContainer: token.tablePrimary,
//                   colorFillAlter: token.tableSecondary,
//                 },
//               },
//             }}
//           >
//             <EditableTable
//               dataSource={filteredList}
//               defaultColumns={defaultColumns}
//               handleSave={handleSave}
//               rowSelection={{
//                 selectedRowKeys,
//                 onChange: handleSelectChange,
//               }}
//             />
//           </ConfigProvider>
//         </Spin>
//       )}
//     </>
//   );
// };

// GoodsTable.propTypes = {
//   form: PropTypes.object.isRequired,
// };

// export default GoodsTable;

// const getSelectedItems = (arr) =>
//   arr?.filter((item) => selectedRowKeys.includes(item.key));

// /// check if it loops code
// useEffect(() => {
//   const selectedItems = getSelectedItems(dataSourceList);
//   console.log('useEffect selectedItems', selectedItems);
//   form.setFieldsValue({ productList: selectedItems });
// }, [selectedRowKeys]);

// const handleSave = (row) => {
//   console.log('handleSave', row);
//   const newDataSourceList = dataSourceList.map((item) =>
//     item.key === row.key ? row : item
//   );

//   const newFilteredList = filteredList.map((item) =>
//     item.key === row.key ? row : item
//   );

//   setDataSourceList(newDataSourceList);
//   setFilteredList(newFilteredList);
//   form.setFieldsValue({ productList: newFilteredList });
// };

// const handleFilterChange = (value) => {
//   let filteredDataSourceList;

//   if (value === 'selected') {
//     filteredDataSourceList = dataSourceList.map((item) =>
//       selectedRowKeys.includes(item.key)
//         ? {
//             ...item,
//             count: item.count || 0,
//             number: item.number || getCurrentYearString(),
//           }
//         : item
//     );
//   } else {
//     filteredDataSourceList = dataSourceList;
//   }

//   console.log('filteredDataSourceList', value, filteredDataSourceList);

//   setDataSourceList(filteredDataSourceList);
//   setFilteredList(
//     value === 'selected'
//       ? getSelectedItems(filteredDataSourceList)
//       : filteredDataSourceList
//   );
// };

// const handleSelectChange = (newSelectedRowKeys) => {
//   console.log('newSelectedRowKeys', newSelectedRowKeys);
//   setSelectedRowKeys(newSelectedRowKeys);
//   const updatedList = dataSourceList.map((item) => {
//     if (newSelectedRowKeys.includes(item.id)) {
//       return {
//         ...item,
//         count: item.count || 0,
//         number: item.number || getCurrentYearString(),
//       };
//     }
//     return item;
//   });

//   console.log('updatedList', updatedList);
//   //setFilteredList(updatedList);
// };

// const onSearch = (value) => {
//   const foundItems = data?.filter(({ name }) =>
//     (name.label || name).toLowerCase().includes(value.toLowerCase())
//   );
//   setFilteredList(foundItems);
// };
