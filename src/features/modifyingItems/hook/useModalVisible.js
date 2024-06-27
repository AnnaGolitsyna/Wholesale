import { useState, useCallback } from 'react';
const useModalVisible = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => setIsModalOpen(true), []);
  const hideModal = useCallback(() => setIsModalOpen(false), []);

  return { isModalOpen, showModal, hideModal };
};

export { useModalVisible };
