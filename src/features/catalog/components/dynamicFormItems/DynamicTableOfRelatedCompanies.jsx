import React from 'react';
//import PropTypes from 'prop-types'
import { Form, Typography, Table } from 'antd';
import { relatedCompaniesColumns } from '../../utils/contractors/getColumns';

const DynamicTableOfRelatedCompanies = (props) => {
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues.relatedCompanies !== currentValues.relatedCompanies
      }
    >
      {({ getFieldValue }) => {
       const relatedCompaniesList = getFieldValue('relatedCompanies');

       return (
         <Form.Item name={props.name} noStyle>
           {relatedCompaniesList?.length ? (
             <Table
               dataSource={relatedCompaniesList}
               columns={relatedCompaniesColumns}
             />
           ) : (
             <Typography.Text code> Связанных компаний нет</Typography.Text>
           )}
         </Form.Item>
       );
      }}
    </Form.Item>
  );
};

//DynamicTableOfRelatedCompanies.propTypes = {}

export default DynamicTableOfRelatedCompanies;
