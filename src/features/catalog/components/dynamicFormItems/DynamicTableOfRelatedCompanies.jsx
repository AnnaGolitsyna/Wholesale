import React from 'react';
import PropTypes from 'prop-types'
import { Form, Typography, Table } from 'antd';
import { relatedCompaniesColumns } from '../../utils/contractors/getColumns';

const DynamicTableOfRelatedCompanies = (props) => {
  const { name } = props;
  console.log('renderProps', props);
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues.relatedCompanies !== currentValues.relatedCompanies
      }
    >
      {({ getFieldValue }) => {
        console.log('renderTable', getFieldValue('relatedCompanies'));
        const relatedCompaniesList = getFieldValue('relatedCompanies');

        return (
          <Form.Item name={name} noStyle>
            {relatedCompaniesList?.length ? (
              <Table
                dataSource={relatedCompaniesList}
                columns={relatedCompaniesColumns}
                pagination={false}
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

DynamicTableOfRelatedCompanies.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DynamicTableOfRelatedCompanies;
