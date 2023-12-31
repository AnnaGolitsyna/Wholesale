import React from 'react';
//import PropTypes from 'prop-types'
import {
  Typography,
  Button,
  Space,
  Input,
  Image,
  DatePicker,
  Divider,
} from 'antd';
import SearchIcon from '../../../../styles/icons/SearchIcon';
import DownloadIconSvg from '../../../../styles/icons/DownloadIcon';
import UploadIcon from '../../../../styles/icons/UploadIcon';

const HeaderFinance = (props) => {
  const onChange = (e) => {
    // handleSearchChange(e.target.value);
    console.log('header', e.target.value);
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
          <DatePicker.RangePicker />
        </Space>

        <Space>
          <DownloadIconSvg />
          <Button>Внести в кассу</Button>
          <Button>Оплатить из кассы</Button>
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
