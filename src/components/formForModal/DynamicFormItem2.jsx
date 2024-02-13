import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Typography, Table } from 'antd';
import { relatedCompaniesColumns } from '../../features/catalog/utils/contractors/getColumns';
import { categoryContractor } from '../../constants/categoryContractor';

const DynamicFormItem2 = (props) => {
  console.log('props', props);
  const { condition, name } = props;
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[condition] !== currentValues[condition]
      }
    >
      {({ getFieldValue }) => {
        if (condition === 'isRelatedCompanies') {
          const relatedCompaniesList = getFieldValue('relatedCompanies');

          return (
            <>
              {relatedCompaniesList?.length ? (
                <Table
                  dataSource={relatedCompaniesList}
                  columns={relatedCompaniesColumns}
                />
              ) : (
                <Typography.Text code> Связанных компаний нет</Typography.Text>
              )}
            </>
          );
        }

        if (condition === 'category') {
          const categoryDetails = categoryContractor.find(
            (category) => category.value === getFieldValue('category')
          );
          const optionsPrices = categoryDetails?.children?.map(
            ({ label, value }) => ({
              label,
              value,
            })
          );
          console.log('optionsPrices', optionsPrices);
          return (
            optionsPrices && (
              <Form.Item name={name} noStyle>
                <Select
                  placeholder="выбери категорию цен"
                  options={optionsPrices}
                />
              </Form.Item>
            )
          );
        }
      }}
    </Form.Item>
  );
};

DynamicFormItem2.propTypes = {
  condition: PropTypes.string.isRequired,
};

export default DynamicFormItem2;
