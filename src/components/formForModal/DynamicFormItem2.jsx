import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Typography, Table } from 'antd';
import { relatedCompaniesColumns } from '../../features/catalog/utils/contractors/getColumns';
import { categoryContractor } from '../../constants/categoryContractor';

import DynamicSelectOfCategoryPrice from '../../features/catalog/components/dynamicFormItems/DynamicSelectOfCategoryPrice';
import DynamicTableOfRelatedCompanies from '../../features/catalog/components/dynamicFormItems/DynamicTableOfRelatedCompanies';

const DynamicFormItem2 = (props) => {
  const { condition, name } = props;

  console.log('propsDF', props);
  const formsFieldsObject = {
    category: <DynamicSelectOfCategoryPrice {...props} />,
    isRelatedCompanies: <DynamicTableOfRelatedCompanies {...props} />,
  };

  const formsField = formsFieldsObject[condition];
    // condition === 'category' ? (
    //   <DynamicSelectOfCategoryPrice {...props} />
    // ) : (
    //   <DynamicTableOfRelatedCompanies {...props} />
    // );
  // console.log('formsField', formsField, formsFieldsObject[condition]);
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[condition] !== currentValues[condition]
      }
    >
      {formsField}
    </Form.Item>
  );
};

DynamicFormItem2.propTypes = {
  condition: PropTypes.string.isRequired,
};

export default DynamicFormItem2;

//  return (
//    <Form.Item
//      noStyle
//      shouldUpdate={(prevValues, currentValues) =>
//        prevValues[condition] !== currentValues[condition]
//      }
//    >
//      {({ getFieldValue }) => {
//        if (condition === 'isRelatedCompanies') {
//          const relatedCompaniesList = getFieldValue('relatedCompanies');

//          return (
//            <>
//              {relatedCompaniesList?.length ? (
//                <Table
//                  dataSource={relatedCompaniesList}
//                  columns={relatedCompaniesColumns}
//                />
//              ) : (
//                <Typography.Text code> Связанных компаний нет</Typography.Text>
//              )}
//            </>
//          );
//        }

//        if (condition === 'category') {
//          const categoryDetails = categoryContractor.find(
//            (category) => category.value === getFieldValue('category')
//          );
//          const optionsPrices = categoryDetails?.children?.map(
//            ({ label, value }) => ({
//              label,
//              value,
//            })
//          );

//          return (
//            optionsPrices && (
//              <Form.Item name={name} noStyle>
//                <Select
//                  placeholder="выбери категорию цен"
//                  options={optionsPrices}
//                />
//              </Form.Item>
//            )
//          );
//        }
//      }}
//    </Form.Item>
//  );
