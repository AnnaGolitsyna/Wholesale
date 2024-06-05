import React from 'react';
import PropTypes from 'prop-types';
import { Form, Typography, Table } from 'antd';
import { relatedCompaniesColumns } from './relatedCompaniesColumns';


const DynamicTable = ({ name }) => {
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues.relatedCompanies !== currentValues.relatedCompanies
      }
    >
      {({ getFieldValue }) => {
        const relatedCompaniesList = getFieldValue('relatedCompanies')?.sort(
          (a, b) => b.active - a.active
        );

        return (
          <Form.Item name={name} noStyle>
            {relatedCompaniesList?.length ? (
              <Table
                dataSource={relatedCompaniesList}
                columns={relatedCompaniesColumns}
                pagination={false}
                size="small"
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

DynamicTable.propTypes = {
    name: PropTypes.string.isRequired,
};

export default DynamicTable;
