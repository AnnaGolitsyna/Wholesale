import React from 'react';
//import PropTypes from 'prop-types'
import {
  Typography,
  Button,
  Space,
  Input,
  Image,
  DatePicker,

} from 'antd';
import SearchIcon from '../../../../styles/icons/SearchIcon';
import DownloadIconSvg from '../../../../styles/icons/DownloadIcon';
import UploadIcon from '../../../../styles/icons/UploadIcon';

import { getToday, formattedDateObj } from '../../../../utils/dateUtils';

const HeaderFinance = ({ showModal, handleSearch }) => {
  const onChange = (e) => {
    // handleSearchChange(e.target.value);
    console.log('header', e.target.value);
   handleSearch(e.target.value);
  };
  return (
    <Space style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Space direction="vertical" align="center">
        <Typography.Title>Список оплат контрагентов</Typography.Title>
        <Space>
          <SearchIcon />
          <Input
            placeholder="наименование контрагента"
            onChange={onChange}
            allowClear
          />
          <DatePicker.RangePicker
            defaultValue={[formattedDateObj('2022-01-01'), formattedDateObj('2023-01-01')]}
            format="YYYY-MM-DD"
          />
        </Space>

        <Space>
          <DownloadIconSvg />
          <Button type="primary" onClick={() => showModal(null, 'create')}>
            Внести новую оплату
          </Button>
          <UploadIcon />
        </Space>
      </Space>
      <Space>
        <Image src="/money.svg" height="200px" width="100%" preview={false} />
      </Space>
    </Space>
  );
};

//HeaderFinance.propTypes = {}

export default HeaderFinance;
