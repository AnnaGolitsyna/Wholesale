import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {selectedProductSelector} from '../../api/selectors'
import {openModalGoods} from '../../api/goodsSlice'
import {formattedDateObj} from '../../../../utils/dateUtils'
import {formattedPrice} from '../../../../utils/priceUtils'
import {CatalogContent} from '../../../../modules/catalog'
import {getGoodsColumns} from '../../utils/getColumns'
import {getToolBarItems} from '../../utils/getToolBarItems'


export const GoodsPage = () => {
  //  const [searchProductsList, setSearchProductsList] = useState([]);
    const [activeStatus, setActiveStatus] = useState(true);
    const [actionType, setActionType] = useState(null);
    const { isGoodsModalOpen, selectedGoods } = useSelector((state) =>
      selectedProductSelector(state)
    );
    const dispatch = useDispatch();



     const handleCheckboxChange = (e) => {
       const value = e.target.value === 'true' ? true : false;
       setActiveStatus(value);
     };
       const handleModifyProduct = (product, actionType) => {
         const formattedProduct = product && {
           ...product,
           dateStart: product.dateStart
             ? formattedDateObj(product.dateStart)
             : null,
           dateEnd: product.dateEnd ? formattedDateObj(product.dateEnd) : null,
           cost: formattedPrice(product.cost),
         };

         setActionType(actionType);
         dispatch(openModalGoods(formattedProduct));
       };
  return (
    <>
      <CatalogContent
        typeData="Goods"
        getColumns={() => getGoodsColumns(handleModifyProduct)()}
        getToolBarItems={() =>
          getToolBarItems(handleCheckboxChange, handleModifyProduct)
        }
        itemsStatus={activeStatus}
        isModalOpen={isGoodsModalOpen}
        itemData={selectedGoods}
        actionType={actionType}
      />
    </>
  );
}

