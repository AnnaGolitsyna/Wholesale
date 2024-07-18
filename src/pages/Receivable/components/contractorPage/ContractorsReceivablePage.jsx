import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const ContractorsReceivablePage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <div>`ContractorsReceivablePage ${id}`</div>
      <Button onClick={() => navigate(-1)}>Показать всех контрагентов</Button>
    </>
  );
};

ContractorsReceivablePage.propTypes = {};

export { ContractorsReceivablePage };
