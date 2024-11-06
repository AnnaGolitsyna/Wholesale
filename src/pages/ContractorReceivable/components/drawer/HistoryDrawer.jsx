import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  Space,

} from 'antd';

import { boxStyle } from '../../../../styles/boxStyle';
import { updateHistoryReceivable } from '../../../Receivable';
import { getColumns } from './columns';
import ConfirmChangeBtn from '../../../../components/popConfirm/ConfirmChangeBtn';
import { ReactComponent as DossierIcon } from '../../../../styles/icons/users/DossierIcon.svg';
import { useContractorReceivableContext } from '../contractorPage/ContractorReceivablePage';

const HistoryDrawer = ({ visible, onClose, onSubmitSuccess }) => {
  const [form] = Form.useForm();
  const changeCountRef = useRef(0);
  const [editingKey, setEditingKey] = useState('');
  const { token } = theme.useToken();

  const { id, accountData, loading, closingBalance, handleHistoryError } =
    useContractorReceivableContext();

  const [data, setData] = useState([]);

  const convertHistoryListToData = useCallback((historyList) => {
    if (!historyList) return [];
    return Object.entries(historyList).map(([dateRange, details]) => ({
      key: dateRange,
      ...details,
    }));
  }, []);

  useEffect(() => {
    if (visible) {
      setData(convertHistoryListToData(accountData?.historyList));
      changeCountRef.current = 0;
    } else {
      setData([]);
      setEditingKey('');
      changeCountRef.current = 0;
    }
  }, [visible, accountData, convertHistoryListToData]);

  const hasUnsavedChanges = useCallback(() => {
    return changeCountRef.current > 0;
  }, []);

  const handleSubmitHistory = async () => {
    try {
      const sortedData = [...data].sort((a, b) =>
        b.dateEnd.localeCompare(a.dateEnd)
      );
      const recentData = sortedData.slice(0, 20);

      const historyList = recentData.reduce((acc, item) => {
        acc[item.key] = {
          isConfirmed: item.isConfirmed || false,
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
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating history:', error);
      handleHistoryError(error);
    }
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

  const title = (
    <Flex align='center' gap={15}>
      <DossierIcon />
      <Typography.Title level={4}>{`Досье на ${accountData?.name}`}</Typography.Title>
    </Flex>
  );

  return (
    <>
      <Drawer
        title={title}
        closeIcon={false}
        open={visible}
        onClose={onClose}
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
        ) : accountData ? (
          <>
            <Flex justify="space-between">
              <Typography.Text
                style={{
                  ...boxStyle,
                  backgroundColor: token.clolrNotificationBg,
                }}
              >
                Задолженность на сегодня: {closingBalance}
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
                  Последняя транзакция: {accountData.lastTransaction}
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
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default HistoryDrawer;
