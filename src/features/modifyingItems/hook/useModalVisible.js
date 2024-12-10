import { useState, useCallback } from 'react';
const useModalVisible = (setConfirmLoading) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => setIsModalOpen(true), []);
  const hideModal = useCallback(() => {
    setConfirmLoading(false);
    setIsModalOpen(false);
  }, [setConfirmLoading]);

  return { isModalOpen, showModal, hideModal };
};

export { useModalVisible };
