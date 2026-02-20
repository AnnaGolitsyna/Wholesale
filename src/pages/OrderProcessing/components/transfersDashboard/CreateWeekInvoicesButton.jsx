import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  DatePicker,
  Select,
  Space,
  Typography,
  message,
  Checkbox,
} from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { stockType } from '../../../../constants/productsDetail';
import { createInvoice } from '../../../InvoiceList/api/operations';
import { formatFormValues } from '../../../../features/modifyingItems/utils/formatFormValues';

const { Text } = Typography;

const getActualPrice = (prices, scheduleDate) => {
  if (!prices || prices.length === 0) return null;
  if (prices.length === 1) return prices[0]?.price || null;

  const targetDate = scheduleDate ? dayjs(scheduleDate) : dayjs().add(7, 'day');
  const deadline = targetDate.add(7, 'day');

  const validPrices = prices
    .filter(
      (p) =>
        p.dateStart &&
        (dayjs(p.dateStart).isBefore(deadline, 'day') ||
          dayjs(p.dateStart).isSame(deadline, 'day')),
    )
    .sort((a, b) => dayjs(b.dateStart).valueOf() - dayjs(a.dateStart).valueOf());

  return validPrices[0]?.price || prices[0]?.price || null;
};

const CreateWeekInvoicesButton = ({ visibleSchedules }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [modalStockType, setModalStockType] = useState('stock');
  const [selectedContractorIds, setSelectedContractorIds] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // Aggregate all contractors with merged products from all schedules in the week
  const allContractors = useMemo(() => {
    const contractorMap = new Map();

    (visibleSchedules || []).forEach((schedule) => {
      (schedule.products || []).forEach((product) => {
        (product.clients || []).forEach((client) => {
          const clientId = client.value || client.id;
          const clientName = client.name || client.clientName;
          if (!clientId || !clientName) return;

          if (!contractorMap.has(clientId)) {
            contractorMap.set(clientId, {
              id: clientId,
              name: { label: clientName, value: clientId },
              categoryPrice: client.categoryPrice,
              products: [],
              totalSum: 0,
              stockType: client.stockType || null,
            });
          }

          const contractor = contractorMap.get(clientId);

          const price = getActualPrice(client.prices, schedule?.date);
          const sum = price ? client.count * price : null;

          contractor.products.push({
            key: `${product.value}-${contractor.products.length}`,
            name: product.productName || product.label,
            count: client.count,
            value: product.value,
            price,
            sum,
          });

          if (sum) contractor.totalSum += sum;
        });
      });
    });

    return Array.from(contractorMap.values());
  }, [visibleSchedules]);

  const filteredContractors = useMemo(
    () =>
      allContractors.filter((c) => !c.stockType || c.stockType === modalStockType),
    [allContractors, modalStockType],
  );

  const handleOpen = () => {
    const firstDate = visibleSchedules?.find((s) => s.date)?.date;
    setModalDate(firstDate ? dayjs(firstDate) : dayjs().add(7, 'day'));
    setModalStockType('stock');
    setSelectedContractorIds([]);
    setSelectAll(false);
    setIsModalOpen(true);
  };

  const handleStockTypeChange = (value) => {
    setModalStockType(value);
    setSelectedContractorIds([]);
    setSelectAll(false);
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedContractorIds(checked ? filteredContractors.map((c) => c.id) : []);
  };

  const handleContractorChange = (ids) => {
    setSelectedContractorIds(ids);
    setSelectAll(ids.length > 0 && ids.length === filteredContractors.length);
  };

  const handleCreate = async () => {
    const contractorsToCreate = filteredContractors.filter((c) =>
      selectedContractorIds.includes(c.id),
    );

    if (contractorsToCreate.length === 0) {
      message.warning('Выберите хотя бы одного контрагента');
      return;
    }

    setIsCreating(true);
    try {
      const dateStr = modalDate.format('YYYY-MM-DD');

      for (const contractor of contractorsToCreate) {
        const data = {
          name: contractor.name,
          productList: contractor.products,
          date: dateStr,
          categoryPrice: contractor.categoryPrice,
          docType: 'sale',
          type: 'debet',
          sum: contractor.totalSum,
          stockType: modalStockType,
          fromOrders: true,
        };
        await createInvoice(formatFormValues(data));
      }

      message.success(`Создано ${contractorsToCreate.length} накладных`);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating invoices:', error);
      message.error('Ошибка при создании накладных');
    } finally {
      setIsCreating(false);
    }
  };

  if (!visibleSchedules || visibleSchedules.length === 0) return null;

  return (
    <>
      <Button
        type="primary"
        icon={<FileAddOutlined />}
        onClick={handleOpen}
        style={{ background: '#5661EE', borderColor: '#30c0c4' }}
      >
        Создать все
      </Button>

      <Modal
        title="Создать накладные за неделю"
        open={isModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isCreating}
        okText="Создать"
        cancelText="Закрыть"
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>Дата:</Text>
            <DatePicker
              value={modalDate}
              onChange={setModalDate}
              style={{ width: '100%', marginTop: 8 }}
              format="YYYY-MM-DD"
            />
          </div>

          <div>
            <Text strong>Тип склада:</Text>
            <Select
              value={modalStockType}
              onChange={handleStockTypeChange}
              style={{ width: '100%', marginTop: 8 }}
              options={Object.entries(stockType).map(([key, val]) => ({
                label: val.label,
                value: key,
              }))}
            />
          </div>

          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Text strong>
                Контрагенты ({selectedContractorIds.length} / {filteredContractors.length}):
              </Text>
              <Checkbox checked={selectAll} onChange={handleSelectAllChange}>
                Выбрать все
              </Checkbox>
            </div>
            <Select
              mode="multiple"
              value={selectedContractorIds}
              onChange={handleContractorChange}
              style={{ width: '100%', marginTop: 8 }}
              options={filteredContractors.map((c) => ({
                label: c.name.label,
                value: c.id,
              }))}
              placeholder="Выберите контрагентов"
            />
          </div>

          <Text type="secondary">Будет создано {selectedContractorIds.length} накладных</Text>
        </Space>
      </Modal>
    </>
  );
};

CreateWeekInvoicesButton.propTypes = {
  visibleSchedules: PropTypes.array,
};

export default CreateWeekInvoicesButton;
