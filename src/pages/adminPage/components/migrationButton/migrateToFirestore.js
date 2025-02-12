import {
  getFirestore,
  writeBatch,
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../../api/firestore';

const mockAPIUrl = 'https://651bfcdb194f77f2a5af3176.mockapi.io/goods';

// This checks and sets up our flag
const initializeMigrationFlag = async () => {
  try {
    const metadataRef = doc(db, 'balanutsa', 'metadata');
    await setDoc(metadataRef, {
      isMigrationCompleted: false,
      migrationDate: null,
    });
    console.log('Migration flag initialized!');
  } catch (error) {
    console.error('Error initializing flag:', error);
  }
};

// Function to fetch data from mockapi.io
const fetchMockData = async () => {
  try {
    const response = await fetch(mockAPIUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data from mockapi.io');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching mock data:', error);
    throw error;
  }
};

const migrateToFirestore = async () => {
  // First, check our flag
  const metadataRef = doc(db, 'balanutsa', 'metadata');
  const metadataDoc = await getDoc(metadataRef);

  // If we already moved the toys (did the migration), stop here
  if (metadataDoc.exists() && metadataDoc.data().isMigrationCompleted) {
    throw new Error(
      'Migration was already done on ' + metadataDoc.data().migrationDate
    );
  }
  // const db = getFirestore();
  const mockData = await fetchMockData();

  // Create reference to the nested 'goods' collection
  // This creates a reference to: 'balanutsa/catalogs/goods'
  const goodsRef = collection(db, 'balanutsa', 'catalogs', 'goods');

  const batchSize = 500;
  const batches = [];
  let currentBatch = writeBatch(db);
  let operationCount = 0;

  try {
    for (const item of mockData) {
      // Create a new document reference in the goods collection
      const docRef = doc(goodsRef);

      // Clean and validate the data before saving
      const productData = {
        name: item.name || '',
        fullName: item.fullName || '',
        supplier: item.supplier || { value: '', label: '' },
        cost: Number(item.cost) || 0,
        superBulk: Number(item.superBulk) || 0,
        bulk: Number(item.bulk) || 0,
        retail: Number(item.retail) || 0,
        dateStart: item.dateStart || null,
        dateEnd: item.dateEnd || null,
        active: Boolean(item.active),
        id: item.id || '',
        // Convert undefined or null to empty string for pricesList
        pricesList: item.pricesList || '',
        createdAt: new Date(),
      };

      // Log the item being processed for debugging
      console.log(
        'Processing item:',
        item.name,
        'with pricesList:',
        item.pricesList
      );

      currentBatch.set(docRef, productData);
      operationCount++;

      if (operationCount === batchSize) {
        batches.push(currentBatch);
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    }

    if (operationCount > 0) {
      batches.push(currentBatch);
    }

    console.log(`Committing ${batches.length} batches...`);
    await Promise.all(batches.map((batch) => batch.commit()));

    console.log('Migration completed successfully!');
    // After successful migration, update our flag
    await setDoc(metadataRef, {
      isMigrationCompleted: true,
      migrationDate: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};

// This is the function you'll actually call to start everything
const runMigration = async () => {
  try {
    // First, put our flag down
    await initializeMigrationFlag();

    // Then start moving the toys (migrating data)
    await migrateToFirestore();

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

export { runMigration };
