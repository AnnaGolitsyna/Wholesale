import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';
import { columns } from './columns';

const ReceivableTable = ({ data, isLoading }) => {
  const [scrollY, setScrollY] = useState(300);

  useEffect(() => {
    const updateScrollHeight = () => {
      const viewportHeight = window.innerHeight;
      const calculatedHeight = Math.max(300, viewportHeight * 0.40);
      setScrollY(calculatedHeight);
    };

    updateScrollHeight();
    window.addEventListener('resize', updateScrollHeight);

    return () => window.removeEventListener('resize', updateScrollHeight);
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        virtual
        scroll={{
          scrollToFirstRowOnChange: true,
          y: scrollY,
        }}
        rowKey={data.id}
      />
    </Spin>
  );
};

ReceivableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

export default ReceivableTable;
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Spin, Table } from 'antd';
// import { columns } from './columns';

// const ReceivableTable = ({ data, isLoading }) => {

//   return (
//     <Spin spinning={isLoading}>
//       <Table
//         dataSource={data}
//         columns={columns}
//         pagination={false}
//         virtual
//         scroll={{ scrollToFirstRowOnChange: true, y:'max(300px, 55vh)', }}
//         rowKey={data.id}
//       />
//     </Spin>
//   );
// };

// ReceivableTable.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object),
//   isLoading: PropTypes.bool,
// };

// export default ReceivableTable;
