'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
}

const iconMap = {
  success: <CheckCircle />,
  error: <Error />,
  info: <Info />,
  warning: <Warning />,
};

// PUBLIC_INTERFACE
export default function AnimatedToast({ 
  message, 
  type, 
  title, 
  open, 
  onClose, 
  autoHideDuration = 4000 
}: ToastProps) {
  /**
   * Animated toast notification component with success, error, info, and warning states
   */
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    }
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Snackbar
          open={isVisible}
          autoHideDuration={autoHideDuration}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Alert
              severity={type}
              icon={iconMap[type]}
              onClose={handleClose}
              sx={{
                '& .MuiAlert-icon': {
                  animation: 'pulse 1.5s ease-in-out infinite',
                },
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              {title && <AlertTitle>{title}</AlertTitle>}
              {message}
            </Alert>
          </motion.div>
        </Snackbar>
      )}
    </AnimatePresence>
  );
}
