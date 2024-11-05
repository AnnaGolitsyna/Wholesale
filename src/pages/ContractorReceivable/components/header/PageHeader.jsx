import React, { useState, useCallback } from 'react';
import { Button, Flex, Typography, theme } from 'antd';
import {
  ArrowRightOutlined,
  AreaChartOutlined,
  ArrowLeftOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import NavLinkWithIcon from '../../../../components/link/NavLinkWithIcon';
import DateRangePickerComponent from '../datePicker/DateRangePickerComponent ';
import ReceivableStatistic from '../statistic/ReceivableStatistic';
import { boxStyle } from '../../../../styles/boxStyle';
import { ReactComponent as NewUserIcon } from '../../../../styles/icons/users/NewUserIcon.svg';
import { ReactComponent as SavingDoc } from '../../../../styles/icons/tools/SavingDoc.svg';
import { FORM_TYPES } from '../../../../constants/formTypes';
import { ModalToPrint } from '../../../../features/printingDocs';
import HistoryDrawer from '../drawer/HistoryDrawer';
import { useContractorReceivableContext } from '../contractorPage/ContractorReceivablePage';
import { name } from 'dayjs/locale/ru';

const PageHeader = () => {
  const {
    isHistoryDrawerVisible,
    setIsHistoryDrawerVisible,
    accountName,
    openingBalance,
    closingBalance,
    datesPeriod,
    handleDateChange,
    toggleView,
    showAnalytics,
    isBtnDisabled,
    isToggleBtnDisabled,
    handleSubmitHistory,
    handleHistoryUpdateAndRefresh,
  } = useContractorReceivableContext();
  const { token } = theme.useToken();

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        position: 'sticky',
        top: 66,
        zIndex: 1,
        backgroundColor: token.colorBgBase,
        margin: '0 0 10px 0',
        ...boxStyle,
      }}
    >
      <Flex vertical gap={'large'}>
        <Flex align="center" justify="flex-start">
          <NewUserIcon />
          <Typography.Title level={5} style={{ margin: '0 0 0 10px' }}>
            {accountName}
          </Typography.Title>
        </Flex>
        <NavLinkWithIcon
          path={'/receivables'}
          LincIcon={<ArrowLeftOutlined />}
          text={'К списку контрагентов'}
        />
      </Flex>

      <Flex vertical style={{ padding: 10 }} gap={'small'}>
        <DateRangePickerComponent
          period={datesPeriod}
          handleChange={handleDateChange}
          showAnalytics={showAnalytics}
        />

        <Flex>
          <Typography.Text style={{ width: '100px' }}>Сальдо:</Typography.Text>
          <Flex
            justify="space-between"
            style={{ width: '100%', padding: '0 10px' }}
          >
            <ReceivableStatistic receivable={openingBalance} />
            <ReceivableStatistic receivable={closingBalance} />
          </Flex>
        </Flex>

        <Button
          icon={showAnalytics ? <TabletOutlined /> : <AreaChartOutlined />}
          onClick={toggleView}
          type="text"
          disabled={isToggleBtnDisabled}
        >
          {showAnalytics
            ? 'Показать транзакции за период'
            : 'Показать динамику продаж за 6 мес'}
        </Button>
      </Flex>

      <Flex vertical>
        <Button disabled={isBtnDisabled}>Print</Button>
        <ModalToPrint
          data={{ name: accountName }}
          type={FORM_TYPES.PRINT_RECEIVABLE}
        />
        <Flex align="center">
          <Button
            style={{ marginRight: '10px' }}
            disabled={isBtnDisabled}
            onClick={handleSubmitHistory}
          >
            Сохранить
          </Button>
          <SavingDoc />
        </Flex>

        <Typography.Link italic onClick={() => setIsHistoryDrawerVisible(true)}>
          Показать историю
          <ArrowRightOutlined style={{ marginLeft: '5px' }} />
        </Typography.Link>
      </Flex>
      {isHistoryDrawerVisible && (
        <HistoryDrawer
          onClose={() => setIsHistoryDrawerVisible(false)}
          visible={isHistoryDrawerVisible}
          onSubmitSuccess={handleHistoryUpdateAndRefresh}
        />
      )}
    </Flex>
  );
};

export default PageHeader;
