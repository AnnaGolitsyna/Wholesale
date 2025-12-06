
import {
  getShortDateFormat,
  formattedDateObj,
} from '../../../utils/dateUtils.js';
/**
 * Product Converter for Firebase Firestore
 *
 * Transforms product data between app format and Firestore format
 * Handles products from products_data.json with all fields including isBarter
 */

const productConverter = {
  /**
   * Convert product data from app format to Firestore format
   * @param {Object} product - Product data from your app
   * @returns {Object} - Firestore-formatted product data
   */
  toFirestore(product) {
    return {
      ...product,
      // Ensure required fields exist
      value: product.value || '',
      label: product.label || '',
      oldName: product.oldName || '',

      // Schedule and box info
      scedule: product.scedule || '',
      inBox: product.inBox || '',

      // Boolean fields
      weekly: product.weekly !== undefined ? product.weekly : false,
      isBarter: product.isBarter !== undefined ? product.isBarter : false,

      // Refunds type
      refundsType: product.refundsType || '',
    };
  },

  /**
   * Convert product data from Firestore format to app format
   * @param {Object} snapshot - Firestore document snapshot
   * @param {Object} options - Firestore options
   * @returns {Object} - App-formatted product data
   */
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    return {
      ...data,
      // Add key field for React lists
      key: snapshot.id,

      // Ensure boolean fields are actually booleans
      weekly: Boolean(data.weekly),
      isBarter: Boolean(data.isBarter),
      amountOdered: Number(data.amountOdered) || 0,
      // Ensure value is present for compatibility
      value: data.value || snapshot.id,
      createdAt: getShortDateFormat(data.createdAt),
    };
  },
};

export default productConverter;
