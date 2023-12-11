import PropTypes from 'prop-types';
import { Tag } from 'antd';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';

const TagSupplier = ({ supplier }) => {
  const contractorslist = useContractorsListSelect();
  const foundSupplier = contractorslist?.find(
    ({ value }) => value === supplier
  );
  const { label } = foundSupplier || {};
  return (
    <>
      <Tag bordered={false} color="blue">
        {label}
      </Tag>
    </>
  );
};

TagSupplier.propTypes = {
  supplier: PropTypes.array,
};

export default TagSupplier;
