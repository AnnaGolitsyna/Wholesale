import {
  writeBatch,
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../../api/firestore';
import productsData from './products_data.json'; // Import your JSON file

/**
 * Initialize the products migration flag
 */
const initializeProductsMigrationFlag = async () => {
  try {
    const metadataRef = doc(db, 'balanutsa', 'metadata');
    const metadataDoc = await getDoc(metadataRef);

    // Get existing metadata or create new
    const existingData = metadataDoc.exists() ? metadataDoc.data() : {};

    await setDoc(
      metadataRef,
      {
        ...existingData,
        isProductsMigrationCompleted: false,
        productsMigrationDate: null,
      },
      { merge: true }
    );

    console.log('Products migration flag initialized!');
  } catch (error) {
    console.error('Error initializing products flag:', error);
  }
};

/**
 * Prepare product data for Firestore
 */
const prepareProductData = (product) => {
  return {
    ...product,
    // Ensure all fields are present
    value: product.value || '',
    label: product.label || '',
    oldName: product.oldName || '',
    amountOdered: String(product.amountOdered || '0'),
    scedule: product.scedule || '',
    inBox: product.inBox || '',

    // Ensure booleans
    weekly: Boolean(product.weekly),
    isBarter: Boolean(product.isBarter),

    // Refunds type
    refundsType: product.refundsType || '',

    // Add timestamps
    createdAt: new Date(),
    importedAt: new Date().toISOString(),
  };
};

/**
 * Main migration function
 */
const migrateProductsToFirestore = async () => {
  console.log('🚀 Starting products migration...');

  // Check migration flag
  const metadataRef = doc(db, 'balanutsa', 'metadata');
  const metadataDoc = await getDoc(metadataRef);

  if (metadataDoc.exists() && metadataDoc.data().isProductsMigrationCompleted) {
    const migrationDate = metadataDoc.data().productsMigrationDate;
    throw new Error(
      `Products migration was already completed on ${migrationDate}`
    );
  }

  // Create reference to the nested 'productsForOrders' collection
  const productsRef = collection(
    db,
    'balanutsa',
    'catalogs',
    'productsForOrders'
  );

  const batchSize = 500;
  const batches = [];
  let currentBatch = writeBatch(db);
  let operationCount = 0;

  try {
    console.log(`📊 Processing ${productsData.length} products...`);

    for (let i = 0; i < productsData.length; i++) {
      const product = productsData[i];

      // Use the 'value' field as the document ID
      const productId = product.value;

      // Create a document reference with the specific ID
      const docRef = doc(productsRef, productId);

      // Prepare product data
      const preparedData = prepareProductData(product);

      // Log progress
      const barterFlag = product.isBarter ? '🔄 BARTER' : '';
      console.log(
        `📝 [${i + 1}/${productsData.length}] Processing: ${
          product.label
        } (ID: ${productId}) ${barterFlag}`
      );

      currentBatch.set(docRef, preparedData);
      operationCount++;

      // Commit batch if we hit the limit
      if (operationCount === batchSize) {
        batches.push(currentBatch);
        console.log(`💾 Batch ${batches.length} ready (${batchSize} products)`);
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    }

    // Add remaining operations to final batch
    if (operationCount > 0) {
      batches.push(currentBatch);
      console.log(`💾 Final batch ready (${operationCount} products)`);
    }

    console.log(`\n🔄 Committing ${batches.length} batch(es) to Firestore...`);
    await Promise.all(batches.map((batch) => batch.commit()));

    console.log('✅ All batches committed successfully!');

    // Update migration flag
    await setDoc(
      metadataRef,
      {
        isProductsMigrationCompleted: true,
        productsMigrationDate: new Date().toISOString(),
      },
      { merge: true }
    );

    // Show summary
    const barterProducts = productsData.filter((p) => p.isBarter === true);
    const regularProducts = productsData.filter((p) => !p.isBarter);

    console.log('\n🎉 Products migration completed successfully!');
    console.log(`📊 Total: ${productsData.length} products`);
    console.log(`   Regular products: ${regularProducts.length}`);
    console.log(`   Barter products: ${barterProducts.length}`);
    console.log(`📍 Location: balanutsa/catalogs/productsForOrders`);

    return true;
  } catch (error) {
    console.error('❌ Error during products migration:', error);
    throw error;
  }
};

/**
 * Main function to run the migration
 */
const runMigration = async () => {
  try {
    console.log('━'.repeat(60));
    console.log('🔥 PRODUCTS MIGRATION TO FIRESTORE');
    console.log('━'.repeat(60));
    console.log('');

    // Initialize flag
    await initializeProductsMigrationFlag();

    // Run migration
    await migrateProductsToFirestore();

    console.log('');
    console.log('━'.repeat(60));
    console.log('✅ Migration process completed!');
    console.log('━'.repeat(60));

    return true;
  } catch (error) {
    console.error('');
    console.error('━'.repeat(60));
    console.error('❌ Migration failed:', error.message);
    console.error('━'.repeat(60));
    throw error;
  }
};

export { runMigration };
