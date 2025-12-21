import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
 // if (!index) return null;
  return (
    <Form form={form} component={false} autoComplete="new-password">
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

EditableRow.propTypes = {
  index: PropTypes.number,
};

export { EditableRow, EditableContext };
