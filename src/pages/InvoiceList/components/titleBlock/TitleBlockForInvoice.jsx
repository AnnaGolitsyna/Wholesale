import React from 'react';
import { Form, Typography, Space } from 'antd';
import FileIcon from '../../../../styles/icons/FileIcon';
import useInvoiceStyleByType from '../../hook/useInvoiceStyleByType';

const TitleBlockForInvoice = () => {
  const form = Form.useFormInstance();
  const { modalDetails } = useInvoiceStyleByType();

  const type = form.getFieldValue('type');
  const docNumber = form.getFieldValue('docNumber');

  const titleText = modalDetails[type]?.titleText;
  const formattedDocNumber = docNumber ? `№ ${docNumber}` : '';

  return (
    <Space>
      <FileIcon />
      <Typography.Title level={3}>
        {titleText
          ? `${titleText} ${formattedDocNumber}`
          : 'Выберите тип документа'}
      </Typography.Title>
    </Space>
  );
};

export default TitleBlockForInvoice;
