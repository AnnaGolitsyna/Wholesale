import { getShortDateFormat } from '../../../../utils/dateUtils';

const contractorConverter = {
  /**
   * Convert contractor data from app format to Firestore format
   * @param {Object} contractor - Contractor data from your app
   * @returns {Object} - Firestore-formatted contractor data
   */
  toFirestore(contractor) {
    return {
      ...contractor,
      // Convert date to short format, handle null/undefined
      date: contractor.date ? getShortDateFormat(contractor.date) : null,

      // Ensure arrays are defined (prevent undefined issues)
      relatedCompanies: contractor.relatedCompanies || [],
      listOrderedItems: contractor.listOrderedItems || [],

      // Ensure these fields exist (from your data structure)
      name: contractor.name || '',
      fullName: contractor.fullName || '',
      category: contractor.category || 'buyer', // default based on your data
      categoryPrice: contractor.categoryPrice || 'retail',
      taxNumber: contractor.taxNumber || null,
      contractNumber: contractor.contractNumber || null,
      email: contractor.email || null,
      phone: contractor.phone || null,
      adress: contractor.adress || null,
      active: contractor.active !== undefined ? contractor.active : true,

      // Optional fields that some contractors have
      stockNumber: contractor.stockNumber || null,
      stockType: contractor.stockType || null,
      docType: contractor.docType || null,
    };
  },

  /**
   * Convert contractor data from Firestore format to app format
   * @param {Object} snapshot - Firestore document snapshot
   * @param {Object} options - Firestore options
   * @returns {Object} - App-formatted contractor data
   */
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    return {
      ...data,
      // Add key field for React lists (same pattern as goods)
      key: snapshot.id,

      // Ensure arrays are always arrays (defensive programming)
      relatedCompanies: Array.isArray(data.relatedCompanies)
        ? data.relatedCompanies.map((company) => ({
            ...company,
            // Ensure each related company has necessary fields
            key: company.key || company.id,
          }))
        : [],

      listOrderedItems: Array.isArray(data.listOrderedItems)
        ? data.listOrderedItems.map((item) => ({
            ...item,
            // Ensure all order items have isBarter field (default to false)
            isBarter: item.isBarter !== undefined ? item.isBarter : false,
          }))
        : [],
    };
  },
};

export default contractorConverter;
