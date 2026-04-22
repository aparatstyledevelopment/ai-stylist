import { createContext, useCallback, useContext, useState } from 'react';

const OverlayContext = createContext(null);

export function OverlayProvider({ children }) {
  const [openSheetId, setOpenSheetId] = useState(null);
  const [sheetData, setSheetData] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const openSheet = useCallback((id, data = null) => {
    setOpenSheetId(id);
    setSheetData(data);
  }, []);

  const closeSheet = useCallback(() => {
    setOpenSheetId(null);
    setSheetData(null);
  }, []);

  const openModal = useCallback((id, data = null) => {
    setModalId(id);
    setModalData(data);
  }, []);

  const closeModal = useCallback(() => {
    setModalId(null);
    setModalData(null);
  }, []);

  const value = {
    openSheetId,
    sheetData,
    openSheet,
    closeSheet,
    modalId,
    modalData,
    openModal,
    closeModal,
  };

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error('useOverlay must be used within OverlayProvider');
  return ctx;
}
