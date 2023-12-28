import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { getContractorNameById } from '../../utils/contractors/getContractorNameById';
import useContractorsListSelect from '../../../../hook/useContractorsListSelect';

const TagSupplier = ({ supplier }) => {
  const contractorslist = useContractorsListSelect();
  const label = getContractorNameById(supplier, contractorslist);
  return (
    <>
      <Tag>{label}</Tag>
    </>
  );
};

TagSupplier.propTypes = {
  supplier: PropTypes.string.isRequired,
};

export default TagSupplier;
