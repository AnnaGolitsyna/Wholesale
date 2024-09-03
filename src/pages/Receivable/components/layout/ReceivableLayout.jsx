import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography, Space, Card, Divider } from 'antd';
import { getTodayFullFormattedDate } from '../../../../utils/dateUtils';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { boxStyle } from '../../../../styles/boxStyle';
import ReceivableHeader from '../header/ReceivableHeader';
import DataDisplayCard from '../dataDisplayCard/DataDisplayCard';
import { ReactComponent as AllPurposeIcon } from '../../../../styles/icons/category/AllPurposeIcon.svg';
import { ReactComponent as BuyerIcon } from '../../../../styles/icons/category/BuyerIcon.svg';
import { ReactComponent as SupplierIcon } from '../../../../styles/icons/category/SupplierIcon.svg';
import ReceivableTable from '../table/ReceivableTable';
import {categoryContractor} from "../../../../constants/categoryContractor";

const { Title, Text } = Typography;

const ReceivableLayout = ({ data, isLoading }) => {
  const [listByType, setListByType] = useState([]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    const filteredList = listByType.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    })
    setListByType(filteredList);
  };

  /// test it !!!!!!!
  const renderList = useMemo(() => {
    return categoryContractor.map((item) => {
      const filteredData = data.filter(
        ({ category }) => category === item.value
      );
      return (
        <DataDisplayCard
          icon={item.icon}
          title={item.label}
          data={filteredData}
          isLoading={isLoading}
        />
      );

    });
  }, [listByType, data, handleChange]);
  console.log(data, listByType, renderList);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReceivableHeader onChange={handleChange} />

      <Row justify="space-around" style={{ flex: 1 }}>
        <Col span={8}>
        <DataDisplayCard icon={<BuyerIcon />} title="Покупатели" data={data} isLoading={isLoading} />
        </Col>
        <Col span={8}></Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
};

ReceivableLayout.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ReceivableLayout;

//  {
//    renderList.map(({ icon, title, component }, index) => (
//      <Col key={title} xs={24} sm={12} md={8} lg={6}>
//        <Space
//          direction="vertical"
//          style={{ width: '100%', marginBottom: 10, ...boxStyle }}
//          align="center"
//        >
//          {icon}
//          <Text strong>{title}</Text>
//        </Space>
//        {component}
//      </Col>
//    ));
//  }
