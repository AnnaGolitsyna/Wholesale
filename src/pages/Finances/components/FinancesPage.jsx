import React, { useState } from 'react';
import { Flex, Segmented, DatePicker, Typography } from 'antd';
import { TableOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import FinanceTemplateTable from './FinanceTemplateTable';
import FinancePlanView from './FinancePlanView';
 
const { Title } = Typography;
 
const VIEWS = {
  TEMPLATE: 'template',
  PLAN: 'plan',
};
 
const FinancesPage = () => {
  const [view, setView] = useState(VIEWS.PLAN);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
 
  const year = selectedMonth.year();
  const month = selectedMonth.month() + 1; // dayjs months are 0-based
 
  return (
    <Flex vertical style={{ height: '100%' }}>
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: 16, flexWrap: 'wrap', gap: 8 }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Финансы
        </Title>
 
        <Flex align="center" gap={12} wrap="wrap">
          {view === VIEWS.PLAN && (
            <DatePicker
              picker="month"
              value={selectedMonth}
              onChange={(date) => date && setSelectedMonth(date)}
              format="MMMM YYYY"
              allowClear={false}
            />
          )}
          <Segmented
            value={view}
            onChange={setView}
            options={[
              {
                label: 'План',
                value: VIEWS.PLAN,
                icon: <CalendarOutlined />,
              },
              {
                label: 'Шаблон',
                value: VIEWS.TEMPLATE,
                icon: <TableOutlined />,
              },
            ]}
          />
        </Flex>
      </Flex>
 
      {/* Content */}
      {view === VIEWS.PLAN ? (
        <FinancePlanView year={year} month={month} />
      ) : (
        <FinanceTemplateTable />
      )}
    </Flex>
  );
};
 


export {FinancesPage};