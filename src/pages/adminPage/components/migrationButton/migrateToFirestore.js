import {
  writeBatch,
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../../api/firestore';
import contractorsData from './contractors_with_orders.json'; // Import your JSON file

// This checks and sets up our flag
const initializeContractorMigrationFlag = async () => {
  try {
    const metadataRef = doc(db, 'balanutsa', 'metadata');
    const metadataDoc = await getDoc(metadataRef);

    // Get existing metadata or create new
    const existingData = metadataDoc.exists() ? metadataDoc.data() : {};

    await setDoc(
      metadataRef,
      {
        ...existingData,
        isContractorMigrationCompleted: false,
        contractorMigrationDate: null,
      },
      { merge: true }
    );

    console.log('Contractor migration flag initialized!');
  } catch (error) {
    console.error('Error initializing contractor flag:', error);
  }
};

// Helper function to format date (matches your getShortDateFormat)
const getShortDateFormat = (date) => {
  if (!date) return null;

  try {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    return null;
  }
};

// Function to prepare contractor data (like your converter)
const prepareContractorData = (contractor) => {
  return {
    ...contractor,
    // Format date
    date: contractor.date ? getShortDateFormat(contractor.date) : null,

    // Ensure arrays exist
    relatedCompanies: contractor.relatedCompanies || [],
    listOrderedItems: contractor.listOrderedItems || [],

    // Ensure required fields
    name: contractor.name || '',
    fullName: contractor.fullName || '',
    category: contractor.category || 'buyer',
    categoryPrice: contractor.categoryPrice || 'bulk',
    taxNumber: contractor.taxNumber || null,
    contractNumber: contractor.contractNumber || null,
    email: contractor.email || null,
    phone: contractor.phone || null,
    adress: contractor.adress || null,
    active: contractor.active !== undefined ? contractor.active : true,

    // Optional fields
    stockNumber: contractor.stockNumber || null,
    stockType: contractor.stockType || null,
    docType: contractor.docType || null,

    // Add timestamps
    createdAt: new Date(),
    importedAt: new Date().toISOString(),
  };
};

const migrateContractorsToFirestore = async () => {
  console.log('🚀 Starting contractor migration...');

  // First, check our flag
  const metadataRef = doc(db, 'balanutsa', 'metadata');
  const metadataDoc = await getDoc(metadataRef);

  // If we already migrated contractors, stop here
  if (
    metadataDoc.exists() &&
    metadataDoc.data().isContractorMigrationCompleted
  ) {
    const migrationDate = metadataDoc.data().contractorMigrationDate;
    throw new Error(
      `Contractor migration was already completed on ${migrationDate}`
    );
  }

  // Create reference to the nested 'contractors' collection
  // This creates: 'balanutsa/catalogs/contractors'
  const contractorsRef = collection(db, 'balanutsa', 'catalogs', 'contractors');

  const batchSize = 500;
  const batches = [];
  let currentBatch = writeBatch(db);
  let operationCount = 0;

  try {
    console.log(`📊 Processing ${contractorsData.length} contractors...`);

    for (let i = 0; i < contractorsData.length; i++) {
      const contractor = contractorsData[i];

      // Use existing ID from your data (important!)
      const contractorId = contractor.id;

      // Create a document reference with the specific ID
      const docRef = doc(contractorsRef, contractorId);

      // Prepare contractor data
      const preparedData = prepareContractorData(contractor);

      // Log progress
      console.log(
        `📝 [${i + 1}/${contractorsData.length}] Processing: ${
          contractor.name
        } (ID: ${contractorId})`
      );

      // Log if contractor has order items
      if (
        contractor.listOrderedItems &&
        contractor.listOrderedItems.length > 0
      ) {
        console.log(`   └─ ${contractor.listOrderedItems.length} order items`);
      }

      currentBatch.set(docRef, preparedData);
      operationCount++;

      // Commit batch if we hit the limit
      if (operationCount === batchSize) {
        batches.push(currentBatch);
        console.log(
          `💾 Batch ${batches.length} ready (${batchSize} contractors)`
        );
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    }

    // Add remaining operations to final batch
    if (operationCount > 0) {
      batches.push(currentBatch);
      console.log(`💾 Final batch ready (${operationCount} contractors)`);
    }

    console.log(`\n🔄 Committing ${batches.length} batch(es) to Firestore...`);
    await Promise.all(batches.map((batch) => batch.commit()));

    console.log('✅ All batches committed successfully!');

    // After successful migration, update our flag
    await setDoc(
      metadataRef,
      {
        isContractorMigrationCompleted: true,
        contractorMigrationDate: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log('\n🎉 Contractor migration completed successfully!');
    console.log(`📊 Total: ${contractorsData.length} contractors`);
    console.log(`📍 Location: balanutsa/catalogs/contractors`);

    return true;
  } catch (error) {
    console.error('❌ Error during contractor migration:', error);
    throw error;
  }
};

// This is the function you'll actually call to start everything
const runMigration = async () => {
  try {
    console.log('━'.repeat(60));
    console.log('🔥 CONTRACTOR MIGRATION TO FIRESTORE');
    console.log('━'.repeat(60));
    console.log('');

    // First, set up the flag
    await initializeContractorMigrationFlag();

    // Then migrate the data
    await migrateContractorsToFirestore();

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
