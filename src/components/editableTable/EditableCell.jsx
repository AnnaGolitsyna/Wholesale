import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { EditableContext } from './EditableRow';

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    // form.setFieldsValue({
    //   [dataIndex]: record[dataIndex],
    // });

    form.setFieldsValue({
      [dataIndex]: record[dataIndex] === 0 ? null : record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });

      //  console.log('save', record);

      //  const currentRowIndex = form.getFieldValue('keys').indexOf(record.key);
      //  const keys = form.getFieldValue('keys');
      //  for (let i = currentRowIndex + 1; i < keys.length; i++) {
      //    const nextRowKey = keys[i];
      //    const nextRowInput = document.querySelector(
      //      `td[data-row-key="${nextRowKey}"] input`
      //    );
      //    if (nextRowInput) {
      //      nextRowInput.focus();
      //      break;
      //    }
      //  }

      // const nextRowKey = record.key + 1; // Assuming each row has a unique key
      // const nextRowInput = document.querySelector(
      //   `td[data-row-key="${nextRowKey}"] input`
      // );
      // if (nextRowInput) {
      //   nextRowInput.focus();
      // }
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Поле ${title} обязательно`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

EditableCell.propTypes = {
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  dataIndex: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default EditableCell;
