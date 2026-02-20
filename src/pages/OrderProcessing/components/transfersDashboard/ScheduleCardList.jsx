import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Empty, Spin } from 'antd';
import ScheduleCard from './ScheduleCard';

const ScheduleCardList = ({ visibleSchedules, isLoading, hasError, activeTab }) => {
  if (hasError) {
    return (
      <Empty description="Ошибка загрузки данных" style={{ marginTop: '50px' }} />
    );
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" tip="Загрузка раскладок...">
          <div style={{ minHeight: '200px' }} />
        </Spin>
      </div>
    );
  }

  if (visibleSchedules.length === 0) {
    return (
      <Empty description="Нет данных для отображения" style={{ marginTop: '50px' }} />
    );
  }

  return (
    <Flex wrap="wrap" gap={16}>
      {visibleSchedules.map((schedule, index) => (
        <ScheduleCard
          key={schedule.docId || `${schedule.scheduleName}-${index}`}
          schedule={schedule}
          activeTab={activeTab}
          dataSource={schedule.dataSource}
        />
      ))}
    </Flex>
  );
};

ScheduleCardList.propTypes = {
  visibleSchedules: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default ScheduleCardList;
