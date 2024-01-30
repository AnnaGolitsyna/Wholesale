import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

const DynamicFormItem = ({ shouldUpdateValue, element, categoryList }) => {
  const {
    name,
    label,
    component,
    rules,
    hasFeedback,
    tooltip,
    valuePropName,
    condition,
  } = element;
  console.log('dynamField', condition);
  if (condition === 'isRelatedCompanies') {
    return (
      <Form.Item
        key={name}
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues.relatedCompanies !== curValues.relatedCompanies
        }
      >
        {({ getFieldValue }) => {
          const relatedCompaniesList = getFieldValue('relatedCompanies') || [];

          return (
            relatedCompaniesList && (
              <Form.Item
                key={name}
                label={label}
                name={name}
                rules={rules}
                hasFeedback={hasFeedback}
                tooltip={tooltip}
                valuePropName={valuePropName}
              >
                {component(relatedCompaniesList)}
              </Form.Item>
            )
          );
          // return users.length ? (
          //   <ul>
          //     {users.map((user) => (
          //       <li key={user.name} className="user">
          //         <Space>
          //           <Avatar icon={<UserOutlined />} />
          //           {`${user.name} - ${user.age}`}
          //         </Space>
          //       </li>
          //     ))}
          //   </ul>
          // ) : (
          //   <Typography.Text className="ant-form-text" type="secondary">
          //     ( <SmileOutlined /> No user yet. )
          //   </Typography.Text>
          // );
        }}
      </Form.Item>
    );
  }
  return (
    <Form.Item
      key={name}
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[shouldUpdateValue] !== currentValues[shouldUpdateValue]
      }
    >
      {({ getFieldValue }) => {
        const categoryDetails = categoryList.find(
          (category) => category.value === getFieldValue(shouldUpdateValue)
        );

        const optionsPrices = categoryDetails?.children?.map(
          ({ label, value }) => ({
            label,
            value,
          })
        );

        return (
          optionsPrices && (
            <Form.Item
              key={name}
              label={label}
              name={name}
              rules={rules}
              hasFeedback={hasFeedback}
              tooltip={tooltip}
              valuePropName={valuePropName}
            >
              {component(optionsPrices)}
            </Form.Item>
          )
        );
      }}
    </Form.Item>
  );
};

DynamicFormItem.propTypes = {
  shouldUpdateValue: PropTypes.string.isRequired,
  element: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    component: PropTypes.func.isRequired,
    rules: PropTypes.array,
    hasFeedback: PropTypes.bool,
    tooltip: PropTypes.string,
    valuePropName: PropTypes.string,
  }).isRequired,
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.node.isRequired,
          value: PropTypes.any.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default DynamicFormItem;
