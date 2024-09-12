import React, { useState, useCallback } from 'react';
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
  Checkbox,
  Input,
  Form,
  Tooltip,
  Space,
  theme,
  ConfigProvider,
} from 'antd';
import {
  LikeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useReceivableData } from '../../api/useReceivableData';
import { boxStyle } from '../../../../styles/boxStyle';
import testData from './testData'; // Import the test data

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{ margin: 0 }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

const HistoryDrawer = ({ textLink, icon }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { contractorData, loading, error } = useReceivableData(id);
  const [data, setData] = useState(testData);
  const [editingKey, setEditingKey] = useState('');
  const { token } = theme.useToken();

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
    setOpen(false);
  };

  const handleIsConfirmedChange = useCallback((key, checked) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, isConfirmed: checked } : item
      )
    );
  }, []);

  const columns = [
    {
      title: <LikeOutlined style={{ color: token.colorTextBase }} />,
      dataIndex: 'isConfirmed',
      key: 'isConfirmed',
      render: (_, record) => (
        <Checkbox
          checked={record.isConfirmed}
          onChange={(e) =>
            handleIsConfirmedChange(record.key, e.target.checked)
          }
        />
      ),
    },
    {
      title: 'Начало периода',
      children: [
        { title: 'Дата', dataIndex: 'dateStart', key: 'dateStart' },
        {
          title: 'Сальдо',
          dataIndex: 'balanceStart',
          key: 'balanceStart',
        },
      ],
    },
    {
      title: 'Конец периода',
      children: [
        {
          title: 'Дата',
          dataIndex: 'dateEnd',
          key: 'dateEnd',
          sorter: (a, b) => a.dateEnd.localeCompare(b.dateEnd),
          sortDirections: ['descend', 'ascend'],
          defaultSortOrder: 'descend',
        },
        { title: 'Сальдо', dataIndex: 'balanceEnd', key: 'balanceEnd' },
      ],
    },
    {
      title: 'Примечание',
      dataIndex: 'notes',
      key: 'notes',
      render: (text, record) => {
        const editable = isEditing(record);
        return (
          <Space>
            {editable ? (
              <Form.Item
                name="notes"
                style={{ margin: 0 }}
                rules={[{ required: true, message: 'Please input notes!' }]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  style={{ width: '300px' }}
                />
              </Form.Item>
            ) : (
              <Typography.Text>{text}</Typography.Text>
            )}
            <Space>
              {editable ? (
                <Flex vertical gap={'small'}>
                  <Tooltip title="Сохранить">
                    <SaveOutlined
                      onClick={() => save(record.key)}
                      style={{ color: token.colorSuccessBg }}
                    />
                  </Tooltip>
                  <Tooltip title="Отмена">
                    <CloseOutlined
                      onClick={cancel}
                      style={{ color: token.colorError }}
                    />
                  </Tooltip>
                </Flex>
              ) : (
                <Tooltip title="Редактировать">
                  <EditOutlined onClick={() => edit(record)} />
                </Tooltip>
              )}
            </Space>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Typography.Link italic onClick={showDrawer}>
        {textLink}
        {icon}
      </Typography.Link>

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
              <Typography.Text
                style={{
                  ...boxStyle,
                  backgroundColor: token.colorReceivable,
                }}
              >
                Последнная транзакция: {contractorData.lastTransaction}
              </Typography.Text>
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
            <Button type="primary">Сохранить</Button>
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
