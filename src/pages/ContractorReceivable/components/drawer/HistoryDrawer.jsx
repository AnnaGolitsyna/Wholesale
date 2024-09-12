import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Drawer, Typography, Spin } from 'antd';
import { useReceivableData } from '../../api/useReceivableData';

const HistoryDrawer = ({ textLink, icon }) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { contractorData, loading, error } = useReceivableData(id);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography.Link italic onClick={showDrawer}>
        {textLink}
        {icon}
      </Typography.Link>
      <Drawer
        title="Contractor History"
        onClose={onClose}
        open={open}
        width={400}
      >
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Typography.Text type="danger">
            Error: {error.message}
          </Typography.Text>
        ) : contractorData ? (
          <>
            <Typography.Title level={4}>{contractorData.name}</Typography.Title>
            <Typography.Paragraph>
              <strong>Receivable:</strong> {contractorData.receivable}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Debet:</strong> {contractorData.debet}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Credit:</strong> {contractorData.credit}
            </Typography.Paragraph>
          </>
        ) : (
          <Typography.Text>No data available</Typography.Text>
        )}
      </Drawer>
    </>
  );
};

HistoryDrawer.propTypes = {
  textLink: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default HistoryDrawer;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Button, Drawer, Typography } from 'antd';
// import {getContractorReceivableData} from "../../api/operations/getContractorReceivableData";

// const HistoryDrawer = ({ textLink, icon }) => {
//   const [open, setOpen] = useState(false);
//   const { id } = useParams();

//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//       <Typography.Link italic onClick={showDrawer}>
//         {textLink}
//         {icon}
//       </Typography.Link>
//       <Drawer title="Basic Drawer" onClose={onClose} open={open}>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Drawer>
//     </>
//   );
// };

// HistoryDrawer.propTypes = {};

// export default HistoryDrawer;
