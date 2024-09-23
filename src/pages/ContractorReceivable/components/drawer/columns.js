import {
  Typography,
  Flex,
  Checkbox,
  Input,
  Form,
  Tooltip,
  Space,
  Tag,
} from 'antd';
import {
  LikeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';


const getColumns = (token, handleChange, isEditing, save, cancel, edit) => [
  {
    title: <LikeOutlined style={{ color: token.colorTextBase }} />,
    dataIndex: 'isConfirmed',
    key: 'isConfirmed',
    render: (_, record) => (
      <Checkbox
        checked={record.isConfirmed}
        onChange={(e) => handleChange(record.key, e.target.checked)}
      />
    ),
  },
  {
    title: 'Начало периода',
    children: [
      {
        title: 'Дата',
        dataIndex: 'dateStart',
        key: 'dateStart',
        render: (text) => <Tag>{text}</Tag>,
      },
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
        render: (text, record) =>
          record.isConfirmed ? (
            <Tag color={token.clolrNotificationBg}>{text}</Tag>
          ) : (
            <Tag>{text}</Tag>
          ),
      },
      {
        title: 'Сальдо',
        dataIndex: 'balanceEnd',
        key: 'balanceEnd',
        render: (_, record) =>
          record.isConfirmed ? (
            <Tag color={token.clolrNotificationBg} style={{ fontSize: '16px' }}>
              {record.balanceEnd}
            </Tag>
          ) : (
            record.balanceEnd
          ),
      },
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
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
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

export { getColumns };
