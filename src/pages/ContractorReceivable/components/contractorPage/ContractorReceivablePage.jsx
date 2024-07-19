import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Flex,
  Space,
  Typography,
  Content,
  Row,
  Col,
} from 'antd';
import TwoAreaChart from '../chart/TwoAreaChart';

const ContractorReceivablePage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    // <>
    //   <div>`ContractorReceivablePage ${id}`</div>

    //   <Button onClick={() => navigate(-1)}>Показать всех контрагентов</Button>

    //   <Typography.Text strong>Name</Typography.Text>
    //   <DatePicker />

    //   <TwoAreaChart />
    // </>

    <Flex vertical style={{ height: '100%' }}>
      {/* First part - 40% height, full width */}
      <Flex style={{ flex: '2', minHeight: '40%' }}>
        {/* Left half */}
        <Flex flex={1} style={{ padding: '10px', border: '1px solid #e8e8e8' }}>
          Top Left Content (20% of total height, 50% width)
        </Flex>
        {/* Right half */}
        <Flex flex={1} style={{ padding: '10px', border: '1px solid #e8e8e8' }}>
          Top Right Content (20% of total height, 50% width)
        </Flex>
      </Flex>

      {/* Second part - 60% height, full width */}
      <Flex
        style={{
          flex: '3',
          minHeight: '60%',
          padding: '10px',
          border: '1px solid #e8e8e8',
        }}
      >
        Bottom Content (60% of total height, 100% width)
      </Flex>
    </Flex>
  );
};

ContractorReceivablePage.propTypes = {};

export { ContractorReceivablePage };
