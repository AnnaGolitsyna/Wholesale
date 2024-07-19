import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const ContractorReceivablePage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <div>`ContractorReceivablePage ${id}`</div>
      <Button onClick={() => navigate(-1)}>Показать всех контрагентов</Button>
    </>
  );
};

ContractorReceivablePage.propTypes = {};

export { ContractorReceivablePage };
