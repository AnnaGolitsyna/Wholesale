import React, { useState, useCallback, useEffect, useRef } from 'react';
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
} from 'antd';

import { useReceivableData } from '../../api/useReceivableData';
import { boxStyle } from '../../../../styles/boxStyle';
import { updateHistoryReceivable } from '../../../Receivable';
import { getColumns } from './columns';
import ConfirmChangeBtn from '../../../../components/popConfirm/ConfirmChangeBtn';

const HistoryDrawer = ({ textLink, icon }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { contractorData, loading, error } = useReceivableData(id);
  const [data, setData] = useState([]);
  const changeCountRef = useRef(0);
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
      changeCountRef.current = 0;
    }
  }, [contractorData]);

  const hasUnsavedChanges = useCallback(() => {
    return changeCountRef.current > 0;
  }, [data]);

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
      changeCountRef.current = 0;
      setOpen(false);
      messageApi.success('История сверок успешно обновлена');
    } catch (error) {
      console.error('Error updating history:', error);
      messageApi.error('Ошибка при обновлении истории сверок');
    }
  };

  const onClose = () => {
    // if (hasUnsavedChanges()) {
    //   // If there are unsaved changes, don't close immediately
    //   // The actual closing will be handled by Popconfirm
    //   console.log('unsaved changes');
    // } else {
    //   setOpen(false);
    // }
    setOpen(false);
  };

  const handleConfirmClose = () => {
    // setData(JSON.parse(originalDataRef.current));
    changeCountRef.current = 0;
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
        changeCountRef.current += 1;
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
    changeCountRef.current += 1;
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
              <ConfirmChangeBtn
                onConfirm={handleSubmitHistory}
                description={`Есть ${changeCountRef.current} шт. несохраненных изменений. Вы уверены, что хотите закрыть?`}
                onClose={onClose}
              />
            ) : (
              <Button onClick={onClose}>Закрыть</Button>
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
              <Tooltip
                placement="bottomRight"
                title="Последняя созданная или отредактированная транзакция"
              >
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
