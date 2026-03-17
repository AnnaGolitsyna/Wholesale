import {
  writeBatch,
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../../api/firestore';

const templateData = [
  { name: '7Я',                fop: 'Наташа', period: 'Еженедельно',   amount: 1155,    payment_type: 'За товар', week_of_month: null },
  { name: 'Пресс курьер',      fop: 'Наташа', period: 'Еженедельно',   amount: 9000,    payment_type: 'За товар', week_of_month: null },
  { name: 'Босенко М.М.',      fop: 'Наташа', period: 'Еженедельно',   amount: 8500,    payment_type: 'За товар', week_of_month: null },
  { name: 'Бульвар',           fop: 'Наташа', period: 'Еженедельно',   amount: 378,     payment_type: 'За товар', week_of_month: null },
  { name: 'Болельщик',         fop: 'Наташа', period: 'Ежемесячно',    amount: 0,       payment_type: 'За товар', week_of_month: 3 },
  { name: 'Публика',           fop: 'Наташа', period: 'Ежемесячно',    amount: 0,       payment_type: 'За товар', week_of_month: 3 },
  { name: 'ЗОЖ',               fop: 'Наташа', period: 'По требованию', amount: 0,       payment_type: 'За товар', week_of_month: null },
  { name: 'Аренда офис',       fop: 'Наташа', period: 'Ежемесячно',    amount: 0,       payment_type: 'За товар', week_of_month: 1 },
  { name: 'Ярмарка',           fop: 'Наташа', period: 'По требованию', amount: 0,       payment_type: 'За товар', week_of_month: null },
  { name: 'Львов Чавус',       fop: 'Наташа', period: 'Ежемесячно',    amount: 0,       payment_type: 'За товар', week_of_month: 4 },
  { name: 'УЦ аренда',         fop: 'Наташа', period: 'Ежемесячно',    amount: 975,     payment_type: 'За товар', week_of_month: 4 },
  { name: 'Усатюк',            fop: 'Наташа', period: 'Ежемесячно',    amount: 0,       payment_type: 'За товар', week_of_month: 1 },
  { name: 'Единый',            fop: 'Наташа', period: 'Ежемесячно',    amount: 1297.5,  payment_type: 'Налоги',   week_of_month: 2 },
  { name: 'ЕСВ',               fop: 'Наташа', period: 'Ежемесячно',    amount: 1902.34, payment_type: 'Налоги',   week_of_month: 2 },
  { name: 'ЕСВ за сотрудника', fop: 'Наташа', period: 'Ежемесячно',    amount: 3804.68, payment_type: 'Налоги',   week_of_month: 2 },
  { name: 'НДФЛ',              fop: 'Наташа', period: 'Ежемесячно',    amount: 3112.92, payment_type: 'Налоги',   week_of_month: 2 },
  { name: 'ВС за себя',        fop: 'Наташа', period: 'Ежемесячно',    amount: 864.7,   payment_type: 'Налоги',   week_of_month: 2 },
  { name: 'ВС за сотрудника',  fop: 'Наташа', period: 'Ежемесячно',    amount: 864.7,   payment_type: 'Налоги',   week_of_month: 2 },
];

const initializeFinanceMigrationFlag = async () => {
  try {
    const metadataRef = doc(db, 'balanutsa', 'metadata');
    const metadataDoc = await getDoc(metadataRef);
    const existingData = metadataDoc.exists() ? metadataDoc.data() : {};

    await setDoc(
      metadataRef,
      {
        ...existingData,
        isFinanceMigrationCompleted: false,
        financeMigrationDate: null,
      },
      { merge: true }
    );

    console.log('Finance migration flag initialized!');
  } catch (error) {
    console.error('Error initializing finance flag:', error);
  }
};

const migrateFinancesToFirestore = async () => {
  console.log('🚀 Starting finance template migration...');

  const metadataRef = doc(db, 'balanutsa', 'metadata');
  const metadataDoc = await getDoc(metadataRef);

  if (
    metadataDoc.exists() &&
    metadataDoc.data().isFinanceMigrationCompleted
  ) {
    const migrationDate = metadataDoc.data().financeMigrationDate;
    throw new Error(
      `Finance migration was already completed on ${migrationDate}`
    );
  }

  // Path: balanutsa/finances/template
  const financesDocRef = doc(db, 'balanutsa', 'finances');
  await setDoc(financesDocRef, { created: true }, { merge: true });

  const templateCol = collection(financesDocRef, 'template');

  const batch = writeBatch(db);

  try {
    console.log(`📊 Processing ${templateData.length} template rows...`);

    for (let i = 0; i < templateData.length; i++) {
      const row = templateData[i];
      const docRef = doc(templateCol);
      batch.set(docRef, row);
      console.log(`📝 [${i + 1}/${templateData.length}] Queued: ${row.name}`);
    }

    console.log('\n🔄 Committing batch to Firestore...');
    await batch.commit();
    console.log('✅ Batch committed successfully!');

    await setDoc(
      metadataRef,
      {
        isFinanceMigrationCompleted: true,
        financeMigrationDate: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log('\n🎉 Finance migration completed successfully!');
    console.log(`📊 Total: ${templateData.length} template rows`);
    console.log(`📍 Location: balanutsa/finances/template`);

    return true;
  } catch (error) {
    console.error('❌ Error during finance migration:', error);
    throw error;
  }
};

const runMigration = async () => {
  try {
    console.log('━'.repeat(60));
    console.log('🔥 FINANCE TEMPLATE MIGRATION TO FIRESTORE');
    console.log('━'.repeat(60));
    console.log('');

    await initializeFinanceMigrationFlag();
    await migrateFinancesToFirestore();

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