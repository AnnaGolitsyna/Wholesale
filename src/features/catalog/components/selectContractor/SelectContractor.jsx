import React from 'react';
//import PropTypes from 'prop-types'
import { Select, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';

const SelectContractor = (props) => {
  console.log('propsSC', props);
  const contractorslist = useContractorsListSelect();
  return (
    <Select
      placeholder="выбери поставщика"
      options={contractorslist}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider />
          <Button
            block
            type="text"
            icon={<PlusOutlined />}
            // onClick={addItem}
          >
            Добавить нового поставщика
          </Button>
        </>
      )}
    />
  );
};

//SelectContractor.propTypes = {}

export default SelectContractor;
