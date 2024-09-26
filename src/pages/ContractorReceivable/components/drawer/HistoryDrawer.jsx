import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Drawer,
  Typography,
  Spin,
  Flex,
  Table,
  Divider,
  Button,
  Form,
  Tooltip,
  theme,
  ConfigProvider,
  message,
  Space,
  Popconfirm,
  Input,
  Checkbox,
} from 'antd';

import { useReceivableData } from '../../api/useReceivableData';
import { boxStyle } from '../../../../styles/boxStyle';
import { updateHistoryReceivable } from '../../../Receivable';
import { getColumns } from './columns';

const { TextArea } = Input;

const HistoryDrawer = ({ textLink, icon }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { contractorData, loading, error } = useReceivableData(id);
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (contractorData && contractorData.historyList) {
      const historyArray = Object.entries(contractorData.historyList).map(
        ([dateRange, details]) => ({
          key: dateRange,
          ...details,
        })
      );
      setData(historyArray);
    }
  }, [contractorData]);

  const hasUnsavedChanges = useCallback(() => {
    if (!contractorData || !contractorData.historyList) return false;

    const currentDataObj = data.reduce((acc, item) => {
      acc[item.key] = {
        isConfirmed: item.isConfirmed,
        balanceStart: item.balanceStart,
        dateStart: item.dateStart,
        notes: item.notes,
        dateEnd: item.dateEnd,
        balanceEnd: item.balanceEnd,
      };
      return acc;
    }, {});

    return (
      JSON.stringify(currentDataObj) !==
      JSON.stringify(contractorData.historyList)
    );
  }, [data, contractorData]);

  const handleSubmitHistory = async () => {
    try {
      const sortedData = [...data].sort((a, b) =>
        b.dateEnd.localeCompare(a.dateEnd)
      );
      const recentData = sortedData.slice(0, 20);

      const historyList = recentData.reduce((acc, item) => {
        acc[item.key] = {
          isConfirmed: item.isConfirmed,
          balanceStart: item.balanceStart,
          dateStart: item.dateStart,
          notes: item.notes,
          dateEnd: item.dateEnd,
          balanceEnd: item.balanceEnd,
        };
        return acc;
      }, {});

      await updateHistoryReceivable(id, historyList);
      setData(recentData);
      setOpen(false);
      messageApi.success('История сверок успешно обновлена');
    } catch (error) {
      console.error('Error updating history:', error);
      messageApi.error('Ошибка при обновлении истории сверок');
    }
  };

  const onClose = () => {
    if (hasUnsavedChanges()) {
      // If there are unsaved changes, don't close immediately
      // The actual closing will be handled by Popconfirm
      console.log('unsaved changes');
    } else {
      setOpen(false);
    }
  };

  const handleConfirmClose = () => {
    if (contractorData && contractorData.historyList) {
      const historyArray = Object.entries(contractorData.historyList).map(
        ([dateRange, details]) => ({
          key: dateRange,
          ...details,
        })
      );
      setData(historyArray);
    }
    setOpen(false);
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ notes: record.notes });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, notes: row.notes });
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleIsConfirmedChange = useCallback((key, checked) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, isConfirmed: checked } : item
      )
    );
  }, []);

    const columns = getColumns(
      token,
      handleIsConfirmedChange,
      isEditing,
      save,
      cancel,
      edit
    );

  return (
    <>
      <Typography.Link italic onClick={() => setOpen(true)}>
        {textLink}
        {icon}
      </Typography.Link>
      {contextHolder}
      <Drawer
        title={
          <Typography.Text type="secondary">{`Досье на ${contractorData?.name}`}</Typography.Text>
        }
        onClose={onClose}
        closeIcon={false}
        open={open}
        width={'75%'}
        extra={
          <Space>
            {hasUnsavedChanges() ? (
              <Popconfirm
                title="Закрыть без сохранения"
                description="Есть несохраненные изменения. Вы уверены, что хотите закрыть без сохранения?"
                onConfirm={handleConfirmClose}
                onCancel={() => {}} // Do nothing on cancel
                okText="Да"
                cancelText="Нет"
              >
                <Button>Закрыть</Button>
              </Popconfirm>
            ) : (
              <Button onClick={() => setOpen(false)}>Закрыть</Button>
            )}
            <Button type="primary" onClick={handleSubmitHistory}>
              Сохранить
            </Button>
          </Space>
        }
      >
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Typography.Text type="danger">
            Error: {error.message}
          </Typography.Text>
        ) : contractorData ? (
          <>
            <Flex justify="space-between">
              <Typography.Text
                style={{
                  ...boxStyle,
                  backgroundColor: token.clolrNotificationBg,
                }}
              >
                Задолженность на сегодня: {contractorData.receivable}
              </Typography.Text>
              <Tooltip title="Последняя созданная или отредактированная транзакция">
                <Typography.Text
                  style={{
                    ...boxStyle,
                    backgroundColor: token.colorReceivable,
                  }}
                >
                  Последняя транзакция: {contractorData.lastTransaction}
                </Typography.Text>
              </Tooltip>
            </Flex>
            <Divider />
            <ConfigProvider
              theme={{ token: { colorBgBase: token.colorReceivable } }}
            >
              <Form form={form} component={false}>
                <Table
                  bordered
                  dataSource={data}
                  columns={columns}
                  rowClassName="editable-row"
                  pagination={false}
                />
              </Form>
            </ConfigProvider>
          </>
        ) : (
          <Typography.Text>No data available</Typography.Text>
        )}
      </Drawer>
    </>
  );
};

HistoryDrawer.propTypes = {
  textLink: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default HistoryDrawer;
// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import {
//   Drawer,
//   Typography,
//   Spin,
//   Flex,
//   Table,
//   Divider,
//   Button,
//   Form,
//   Tooltip,
//   theme,
//   ConfigProvider,
//   message,
//   Space,
//   Popconfirm,
// } from 'antd';

// import { useReceivableData } from '../../api/useReceivableData';
// import { boxStyle } from '../../../../styles/boxStyle';
// import testData from './testData'; // Import the test data
// import { getColumns } from './columns';
// import { updateHistoryReceivable } from '../../../Receivable';
// import ConfirmChangeBtn from '../../../../components/popConfirm/ConfirmChangeBtn';

// const CloseButton = React.forwardRef(({ onClick }, ref) => (
//   <Button ref={ref} onClick={onClick}>
//     Закрыть
//   </Button>
// ));

// CloseButton.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };

// const HistoryDrawer = ({ textLink, icon }) => {
//   const [form] = Form.useForm();
//   const [open, setOpen] = useState(false);
//   const { id } = useParams();
//   const { contractorData, loading, error } = useReceivableData(id);
//   const [data, setData] = useState([]);
//   const isOriginalDataChanged = useRef(false);
//   const [editingKey, setEditingKey] = useState('');
//   const { token } = theme.useToken();
//   const [messageApi, contextHolder] = message.useMessage();

//   useEffect(() => {
//     if (contractorData && contractorData.historyList) {
//       const historyArray = Object.entries(contractorData.historyList).map(
//         ([dateRange, details]) => ({
//           key: dateRange,
//           ...details,
//         })
//       );
//       setData(historyArray);
//       // isOriginalDataChanged.current = historyArray;
//     }
//   }, [contractorData]);

//   //const hasUnsavedChanges =  JSON.stringify(data) !== JSON.stringify(isOriginalDataChanged.current);

//   const handleSubmitHistory = async () => {
//     try {
//       const sortedData = [...data].sort((a, b) =>
//         b.dateEnd.localeCompare(a.dateEnd)
//       );
//       const recentData = sortedData.slice(0, 20);

//       const historyList = recentData.reduce((acc, item) => {
//         acc[item.key] = {
//           isConfirmed: item.isConfirmed,
//           balanceStart: item.balanceStart,
//           dateStart: item.dateStart,
//           notes: item.notes,
//           dateEnd: item.dateEnd,
//           balanceEnd: item.balanceEnd,
//         };
//         return acc;
//       }, {});

//       await updateHistoryReceivable(id, historyList);
//       setData(recentData);
//       isOriginalDataChanged.current = false;
//       setOpen(false);
//       messageApi.success('История сверок успешно обновлена');
//     } catch (error) {
//       console.error('Error updating history:', error);
//       messageApi.error('Ошибка при обновлении истории сверок');
//     }
//   };

//   // const onClose = () => {
//   //   setOpen(false);
//   //   isOriginalDataChanged.current = false;
//   // };

//   const onClose = () => {
//     if (isOriginalDataChanged.current) {
//       // If there are unsaved changes, don't close immediately
//       // The actual closing will be handled by Popconfirm
//       console.log('unsaved changes');
//     } else {
//       setOpen(false);
//     }
//   };

//   const handleConfirmClose = () => {
//     setOpen(false);
//     isOriginalDataChanged.current = false;
//   };

//   console.log('contractorData', contractorData, data);

//   const isEditing = (record) => record.key === editingKey;

//   const edit = (record) => {
//     form.setFieldsValue({ notes: record.notes });
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey('');
//   };

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.key);
//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, { ...item, notes: row.notes });
//         setData(newData);
//         setEditingKey('');
//         isOriginalDataChanged.current = true;
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const handleIsConfirmedChange = useCallback((key, checked) => {
//     setData((prevData) =>
//       prevData.map((item) =>
//         item.key === key ? { ...item, isConfirmed: checked } : item
//       )
//     );
//     isOriginalDataChanged.current = true;
//   }, []);

//   const columns = getColumns(
//     token,
//     handleIsConfirmedChange,
//     isEditing,
//     save,
//     cancel,
//     edit
//   );

//   console.log('ref', isOriginalDataChanged);

//   return (
//     <>
//       <Typography.Link italic onClick={showDrawer}>
//         {textLink}
//         {icon}
//       </Typography.Link>
//       {contextHolder}
//       <Drawer
//         // title={`История сверок с ${contractorData?.name}`}
//         title={
//           <Typography.Text type="secondary">{`Досье на ${contractorData?.name}`}</Typography.Text>
//         }
//         onClose={onClose}
//         closeIcon={false}
//         open={open}
//         width={'75%'}
//         extra={
//           <Space>
//             {/* {isOriginalDataChanged ? (
//               <Popconfirm
//                 title="Delete the task"
//                 description="Are you sure to delete this task?"
//                 okText="Yes"
//                 cancelText="No"
//                 cancelButtonProps={onClose}
//                 okButtonProps={handleSubmitHistory}
//               >
//                 <Button >Закрыть</Button>
//               </Popconfirm>
//             ) : (
//               <Button onClick={onClose}>Закрыть</Button>
//             )} */}
//             <Popconfirm
//               title="Закрыть без сохранения"
//               description="Есть несохраненные изменения. Вы уверены, что хотите закрыть без сохранения?"
//               onConfirm={handleConfirmClose}
//               onCancel={() => {}} // Do nothing on cancel
//               okText="Да"
//               cancelText="Нет"
//             >
//               <Button onClick={onClose}>Закрыть</Button>
//             </Popconfirm>
//             <Button type="primary" onClick={handleSubmitHistory}>
//               Сохранить
//             </Button>
//           </Space>
//         }
//       >
//         {loading ? (
//           <Spin size="large" />
//         ) : error ? (
//           <Typography.Text type="danger">
//             Error: {error.message}
//           </Typography.Text>
//         ) : contractorData ? (
//           <>
//             <Flex justify="space-between">
//               <Typography.Text
//                 style={{
//                   ...boxStyle,
//                   backgroundColor: token.clolrNotificationBg,
//                 }}
//               >
//                 Задолженность на сегодня: {contractorData.receivable}
//               </Typography.Text>
//               <Tooltip title="Последняя созданная или отредактированная транзакция">
//                 <Typography.Text
//                   style={{
//                     ...boxStyle,
//                     backgroundColor: token.colorReceivable,
//                   }}
//                 >
//                   Последнная транзакция: {contractorData.lastTransaction}
//                 </Typography.Text>
//               </Tooltip>
//             </Flex>

//             <Divider />
//             <ConfigProvider
//               theme={{
//                 token: {
//                   colorBgBase: token.colorReceivable,
//                 },
//               }}
//             >
//               <Form form={form} component={false}>
//                 <Table
//                   bordered
//                   dataSource={data}
//                   columns={columns}
//                   rowClassName="editable-row"
//                   pagination={false}
//                   // title={() => 'Список сохраненных сверок'}
//                 />
//               </Form>
//             </ConfigProvider>
//           </>
//         ) : (
//           <Typography.Text>No data available</Typography.Text>
//         )}
//       </Drawer>
//     </>
//   );
// };

// HistoryDrawer.propTypes = {
//   textLink: PropTypes.string.isRequired,
//   icon: PropTypes.node,
// };

// export default HistoryDrawer;
