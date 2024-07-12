import { ReactComponent as AllPurposeIcon } from '../../../styles/icons/category/AllPurposeIcon.svg';
import { ReactComponent as BuyerIcon } from '../../../styles/icons/category/BuyerIcon.svg';
import { ReactComponent as SupplierIcon } from '../../../styles/icons/category/SupplierIcon.svg';
import ReceivableTable from '../components/table/ReceivableTable';

const getRenderList = (data, isLoading) => {
  const buyers = data.filter(({ category }) => category === 'buyer');
  const suppliers = data.filter(({ category }) => category === 'supplier');
  const allPurpose = data.filter(({ category }) => category === 'all-purpose');

  return [
    {
      icon: <BuyerIcon />,
      title: 'Покупатели',
      component: <ReceivableTable data={buyers} isLoading={isLoading} />,
    },
    {
      icon: <AllPurposeIcon />,
      title: 'Бартер',
      component: <ReceivableTable data={allPurpose} isLoading={isLoading} />,
    },
    {
      icon: <SupplierIcon />,
      title: 'Поставщики',
      component: <ReceivableTable data={suppliers} isLoading={isLoading} />,
    },
  ];
};

export { getRenderList };
