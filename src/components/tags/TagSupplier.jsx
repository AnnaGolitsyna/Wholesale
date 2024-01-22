import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { getContractorLabelById } from '../../features/catalog/utils/contractors/getContractorNameById';
import useContractorsListSelect from '../../hook/useContractorsListSelect';

const TagSupplier = ({ supplier }) => {
  console.log('tag', supplier, supplier.label);
 // const contractorslist = useContractorsListSelect();
 // const label = getContractorLabelById(supplier, contractorslist);
  return (
    <>
      <Tag>{supplier.label}</Tag>
    </>
  );
};

TagSupplier.propTypes = {
 // supplier: PropTypes.string.isRequired,
};

export default TagSupplier;
