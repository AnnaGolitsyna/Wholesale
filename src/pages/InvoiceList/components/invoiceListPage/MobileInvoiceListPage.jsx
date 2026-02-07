import React, { useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  DatePicker,
  List,
  Typography,
  Spin,
  Empty,
  Collapse,
  Flex,
  Space,
  Card,
  theme,
  Checkbox,
  Button,
  Popconfirm,
} from 'antd';
import { CheckSquareOutlined, BorderOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteInvoice } from '../../api/operations';
import PrintButton from '../printButton/PrintButton';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { getInvoicesListRef } from '../../api/firebaseRefs';
import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import useSearchParamState from '../../../../hook/useSearchParamState';
import { OPERATION_TYPES } from '../../../../constants/operationTypes';
import { formattedPriceToString } from '../../../../utils/priceUtils';

dayjs.extend(isBetween);

const { Text, Title } = Typography;

const MobileInvoiceListPage = () => {
  const { token } = theme.useToken();
  const docType = OPERATION_TYPES.SALE;
  const [selectedWeek, setSelectedWeek] = useState(dayjs());
  const [selectedItems, setSelectedItems] = useState([]);
  const [month, setMonth] = useSearchParamState(
    'month',
    getThisMonth(),
    getShortMonthFormat,
    [docType],
  );

  const invoiceListRef = useMemo(
    () => getInvoicesListRef(month, docType),
    [month, docType],
  );
  const [data, loading, error] = useCollectionData(invoiceListRef);

  // Filter data by selected week (Sunday to Saturday) and type debet
  const filteredData = useMemo(() => {
    if (!data || !selectedWeek) return [];

    const weekStart = selectedWeek.startOf('week').startOf('day');
    const weekEnd = selectedWeek.endOf('week').endOf('day');

    return data.filter((item) => {
      // Filter by type debet only
      if (item.type !== OPERATION_TYPES.DEBET) return false;

      const itemDate = dayjs(item.date);
      if (!itemDate.isValid()) return false;
      return (
        itemDate.isSame(weekStart, 'day') ||
        itemDate.isSame(weekEnd, 'day') ||
        (itemDate.isAfter(weekStart) && itemDate.isBefore(weekEnd))
      );
    });
  }, [data, selectedWeek]);

  // Sort by name
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) =>
      (a.name?.label || '').localeCompare(b.name?.label || ''),
    );
  }, [filteredData]);

  const handleWeekChange = (date) => {
    setSelectedWeek(date);
    if (date) {
      const newMonth = date.format('YYYY-MM');
      if (newMonth !== month) {
        setMonth(newMonth);
      }
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 200 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    return <Empty description="Error loading data" />;
  }

  return (
    <div style={{ padding: 8 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0 }}>
          Накладные
        </Title>
        <DatePicker
          picker="week"
          value={selectedWeek}
          onChange={handleWeekChange}
          format={(value) => {
            const start = value.startOf('week').format('DD.MM');
            const end = value.endOf('week').format('DD.MM');
            return `${start} - ${end}`;
          }}
          allowClear={false}
          size="small"
        />
      </Flex>

      <Flex gap={8} style={{ marginBottom: 12 }}>
        <Button
          icon={selectedItems.length === sortedData.length && sortedData.length > 0 ? <CheckSquareOutlined /> : <BorderOutlined />}
          size="small"
          onClick={() => {
            if (selectedItems.length === sortedData.length) {
              setSelectedItems([]);
            } else {
              setSelectedItems(sortedData.map((item) => item.id));
            }
          }}
        >
          {selectedItems.length === sortedData.length ? 'Снять все' : 'Выбрать все'}
        </Button>
        <PrintButton
          selectedItems={selectedItems}
          sortedData={sortedData}
          datePeriod={selectedWeek ? [
            selectedWeek.startOf('week').format('DD.MM'),
            selectedWeek.endOf('week').format('DD.MM'),
          ] : null}
        />
      </Flex>

      {sortedData.length === 0 ? (
        <Empty description="Нет накладных за выбранную неделю" />
      ) : (
        <List
          dataSource={sortedData}
          renderItem={(item) => (
            <Card
              size="small"
              style={{
                marginBottom: 12,
                borderRadius: 12,
                background: token.cardBgAccent,
                borderLeft: `4px solid ${token.saleOrderAccent}`,
              }}
              styles={{ body: { padding: 12 } }}
            >
              <Flex justify="space-between" align="center">
                <Space>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...selectedItems, item.id]);
                      } else {
                        setSelectedItems(selectedItems.filter((id) => id !== item.id));
                      }
                    }}
                  />
                  <Flex vertical>
                    <Text strong style={{ fontSize: 14 }}>
                      {item.name?.label}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      №{item.docNumber} | {item.date}
                    </Text>
                  </Flex>
                </Space>

                <Space>
                  <Text
                    strong
                    style={{ fontSize: 16, color: token.saleOrderAccent }}
                  >
                    {formattedPriceToString(item.sum)}
                  </Text>
                  <Popconfirm
                    title="Удалить накладную?"
                    onConfirm={() => deleteInvoice(item)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <DeleteOutlined style={{ color: token.colorError, cursor: 'pointer' }} />
                  </Popconfirm>
                </Space>
              </Flex>
              <Collapse
                size="small"
                ghost
                style={{ marginTop: 8 }}
                items={[
                  {
                    key: '1',
                    label: (
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Товары ({item.productList?.length || 0})
                      </Text>
                    ),
                    children: (
                      <List
                        size="small"
                        dataSource={
                          item.productList
                            ?.slice()
                            .sort((a, b) => a.name.localeCompare(b.name)) || []
                        }
                        renderItem={(product) => (
                          <List.Item style={{ padding: '4px 0' }}>
                            <Flex
                              justify="space-between"
                              style={{ width: '100%' }}
                            >
                              <Text style={{ fontSize: 12 }}>
                                {product.name}
                              </Text>
                              <Space size="small">
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                  {product.count} x{' '}
                                  {formattedPriceToString(
                                    product.price ?? product.selectedPrice,
                                  )}
                                </Text>
                                <Text style={{ fontSize: 12 }}>
                                  {formattedPriceToString(
                                    product.count *
                                      (product.price ?? product.selectedPrice),
                                  )}
                                </Text>
                              </Space>
                            </Flex>
                          </List.Item>
                        )}
                      />
                    ),
                  },
                ]}
              />
            </Card>
          )}
        />
      )}

      <Flex justify="space-between" align="center">
        <Text strong>Всего:</Text>
        <Text strong>
          {formattedPriceToString(
            sortedData.reduce((acc, item) => acc + (item.sum || 0), 0),
          )}
        </Text>
      </Flex>
    </div>
  );
};

export default MobileInvoiceListPage;
