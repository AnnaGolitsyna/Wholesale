import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Flex,
  Typography,
  DatePicker,
  theme,
  Statistic,
  Space,
  Divider,
} from 'antd';
import {
  ArrowRightOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  ArrowLeftOutlined,
  TableOutlined,
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

const PageHeader = ({
  name,
  balanceStart,
  balanceEnd,
  period,
  handleChange,
  toggleView,
  showAnalytics,
  disabled,
  toggleDisabled,
}) => {
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
            {name}
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
          period={period}
          handleChange={handleChange}
          showAnalytics={showAnalytics}
        />

        <Flex>
          <Typography.Text style={{ width: '100px' }}>Сальдо:</Typography.Text>
          <Flex
            justify="space-between"
            style={{ width: '100%', padding: '0 10px' }}
          >
            <ReceivableStatistic receivable={balanceStart} />
            <ReceivableStatistic receivable={balanceEnd} />
          </Flex>
        </Flex>

        <Button
          icon={showAnalytics ? <TabletOutlined /> : <AreaChartOutlined />}
          onClick={toggleView}
          type="text"
          disabled={toggleDisabled}
        >
          {showAnalytics
            ? 'Показать транзакции за период'
            : 'Показать динамику продаж за 6 мес'}
        </Button>
      </Flex>

      <Flex vertical>
        <Button disabled={disabled}>Print</Button>
        {/* <ModalToPrint data={[]} type={FORM_TYPES.PRINT_INVOICE} /> */}
        <Flex align="center">
          <Button style={{ marginRight: '10px' }} disabled={disabled}>
            Сохранить
          </Button>
          <SavingDoc />
        </Flex>
        <Typography.Link italic>
          {'Показать историю'}
          <ArrowRightOutlined style={{ marginLeft: '5px' }} />
        </Typography.Link>
      </Flex>
    </Flex>
  );
};

PageHeader.propTypes = {
  name: PropTypes.string.isRequired,
  balanceStart: PropTypes.string.isRequired,
  balanceEnd: PropTypes.string.isRequired,
  period: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleView: PropTypes.func.isRequired,
  showAnalytics: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  toggleDisabled: PropTypes.bool.isRequired,
};

export default PageHeader;
