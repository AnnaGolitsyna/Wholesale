import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { getContractorNameById } from '../../utils/contractors/getContractorNameById';

const TagSupplier = ({ supplier, contractorslist }) => {
  // const foundSupplier = contractorslist?.find(
  //   ({ value }) => value === supplier
  // );
  // const { label } = foundSupplier || {};

  const label = getContractorNameById(supplier, contractorslist)
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
