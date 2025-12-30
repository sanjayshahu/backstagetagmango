'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ModalTrackingContextValue {
  isModalOpen: boolean;
  topModalId: string | null;
  registerModal: () => string;
  unregisterModal: (id: string) => void;
}

const ModalTrackingContext = createContext<ModalTrackingContextValue | null>(null);

export function ModalTrackingProvider({ children }: { children: React.ReactNode }) {
  const [modalStack, setModalStack] = useState<string[]>([]);

  const registerModal = useCallback(() => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    setModalStack((prev) => [...prev, id]);
    return id;
  }, []);

  const unregisterModal = useCallback((id: string) => {
    setModalStack((prev) => {
      const index = prev.indexOf(id);
      if (index === -1) return prev;
      // Cascade: remove this modal and all after it
      return prev.slice(0, index);
    });
  }, []);

  const topModalId = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const isModalOpen = modalStack.length > 0;

  return (
    <ModalTrackingContext.Provider
      value={{
        isModalOpen,
        topModalId,
        registerModal,
        unregisterModal,
      }}
    >
      {children}
    </ModalTrackingContext.Provider>
  );
}

export function useModalTracking() {
  const context = useContext(ModalTrackingContext);
  if (!context) {
    throw new Error('useModalTracking must be used within a ModalTrackingProvider');
  }
  return context;
}
