'use client';
import { useState, useCallback } from 'react';

export interface ToastState {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
}

// PUBLIC_INTERFACE
export function useToast() {
  /**
   * Custom hook for managing toast notifications
   * Returns methods to show and hide toast notifications
   */
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    type: 'info',
    title: undefined,
  });

  const showToast = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    title?: string
  ) => {
    setToast({
      open: true,
      message,
      type,
      title,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      open: false,
    }));
  }, []);

  const showSuccess = useCallback((message: string, title?: string) => {
    showToast(message, 'success', title);
  }, [showToast]);

  const showError = useCallback((message: string, title?: string) => {
    showToast(message, 'error', title);
  }, [showToast]);

  const showInfo = useCallback((message: string, title?: string) => {
    showToast(message, 'info', title);
  }, [showToast]);

  const showWarning = useCallback((message: string, title?: string) => {
    showToast(message, 'warning', title);
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
