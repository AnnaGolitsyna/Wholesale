import PropTypes from 'prop-types';
import { Tag } from 'antd';

const TagSupplier = ({ supplier, contractorslist }) => {

  const foundSupplier = contractorslist?.find(
    ({ value }) => value === supplier
  );
  const { label } = foundSupplier || {};
  return (
    <>
      <Tag>{label}</Tag>
    </>
  );
};

TagSupplier.propTypes = {
  supplier: PropTypes.string.isRequired,
  contractorslist: PropTypes.array.isRequired,
};

export default TagSupplier;
