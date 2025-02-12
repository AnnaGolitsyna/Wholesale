import React from 'react';
import { Button, message } from 'antd';
import { runMigration } from './migrateToFirestore';

const MigrationButton = () => {
  const handleMigration = async () => {
    try {
      message.loading('Starting migration...', 0);
      await runMigration();
      message.destroy();
      message.success('Migration completed!');
    } catch (error) {
      message.destroy();
      message.error(error.message);
    }
  };

  return <Button onClick={handleMigration} disabled>Start Migration</Button>;
};

export default MigrationButton;
