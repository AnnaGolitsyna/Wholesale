import React from 'react';
import { Form, Typography, Space } from 'antd';
import useInvoiceStyleByType from '../../../../hook/useInvoiceStyleByType';
import { ReactComponent as ModifyDocIcon } from '../../../../styles/icons/tools/ModifyDocIcon.svg';

const TitleBlockForInvoice = () => {
  const form = Form.useFormInstance();
  const { modalDetails } = useInvoiceStyleByType();

  const type = form.getFieldValue('type');
  const docNumber = form.getFieldValue('docNumber');

  const titleText = modalDetails[type]?.titleText;
  const formattedDocNumber = docNumber ? `№ ${docNumber}` : '';

  return (
    <Space>
      <ModifyDocIcon />
      <Typography.Title level={3} style={{ margin: '0 10px' }}>
        {titleText
          ? `${titleText} ${formattedDocNumber}`
          : 'Выберите тип документа'}
      </Typography.Title>
    </Space>
  );
};

export default TitleBlockForInvoice;
