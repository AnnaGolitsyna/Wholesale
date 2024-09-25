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
} from 'antd';

import { useReceivableData } from '../../api/useReceivableData';
import { boxStyle } from '../../../../styles/boxStyle';
import testData from './testData'; // Import the test data
import { getColumns } from './columns';
import { updateHistoryReceivable } from '../../../Receivable';

const HistoryDrawer = ({ textLink, icon }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { contractorData, loading, error } = useReceivableData(id);
  const [data, setData] = useState([]);

  const [originalData, setOriginalData] = useState([]);

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

      setOriginalData(historyArray);
    }
  }, [contractorData]);

  const handleSubmitHistory = async () => {
    try {
      // Sort the data array by dateEnd in descending order (most recent first)
      const sortedData = [...data].sort((a, b) =>
        b.dateEnd.localeCompare(a.dateEnd)
      );

      // Keep only the 20 most recent items
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

      // Update the local state to reflect the changes
      setData(recentData);

      messageApi.success('История сверок успешно обновлена');
    } catch (error) {
      console.error('Error updating history:', error);
      messageApi.error('Ошибка при обновлении истории сверок');
    }
  };

  console.log('contractorData', contractorData, data);

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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);
    if (hasChanges) {
      console.log('save changes');
      messageApi.info(
        'There are unsaved changes. Do you want to save before closing?'
      );
    }
    setOpen(false);
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
      <Typography.Link italic onClick={showDrawer}>
        {textLink}
        {icon}
      </Typography.Link>
      {contextHolder}
      <Drawer
        title={`История сверок с ${contractorData?.name}`}
        onClose={onClose}
        open={open}
        width={'75%'}
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
                  Последнная транзакция: {contractorData.lastTransaction}
                </Typography.Text>
              </Tooltip>
            </Flex>

            <Divider />
            <ConfigProvider
              theme={{
                token: {
                  colorBgBase: token.colorReceivable,
                },
              }}
            >
              <Form form={form} component={false}>
                <Table
                  bordered
                  dataSource={data}
                  columns={columns}
                  rowClassName="editable-row"
                  pagination={false}
                  // title={() => 'Список сохраненных сверок'}
                />
              </Form>
            </ConfigProvider>
            <Divider />
            <Button type="primary" onClick={handleSubmitHistory}>
              Сохранить
            </Button>
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
