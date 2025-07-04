'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Container,
  Button,
  Typography,
  Box,
  Modal,
  Paper,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Feedback as FeedbackIcon,
  Send,
  Close,
  RateReview,
} from '@mui/icons-material';
import ProtectedRoute from '@/components/ProtectedRoute';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import AnimatedToast from '@/components/AnimatedToast';

interface FeedbackForm {
  feedback: string;
}

export default function FeedbackPage() {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FeedbackForm>();
  const theme = useTheme();

  const onSubmit: SubmitHandler<FeedbackForm> = async () => {
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitting(false);
    setToastOpen(true);
    reset();
    setShowModal(false);
  };

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  return (
    <ProtectedRoute>
      <AnimatedPageWrapper>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
              Share Your Feedback
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We value your input to improve your wellness experience
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              sx={{
                textAlign: 'center',
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 6 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                >
                  <FeedbackIcon sx={{ fontSize: 64, color: 'primary.main', mb: 3 }} />
                </motion.div>
                <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
                  Help Us Improve
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Your feedback helps us create a better wellness experience for everyone
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RateReview />}
                  onClick={() => setShowModal(true)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  Leave Feedback
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <AnimatePresence>
            {showModal && (
              <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="feedback-modal"
                aria-describedby="feedback-form"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 50 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Paper sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5" component="h2" fontWeight={600}>
                        Submit Feedback
                      </Typography>
                      <Button
                        onClick={() => setShowModal(false)}
                        sx={{ minWidth: 'auto', p: 1 }}
                      >
                        <Close />
                      </Button>
                    </Box>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        placeholder="Share your experience, suggestions, or any issues you've encountered..."
                        {...register('feedback', { required: 'Please enter your feedback' })}
                        error={!!errors.feedback}
                        helperText={errors.feedback?.message}
                        variant="outlined"
                        sx={{
                          mb: 3,
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        }}
                      />
                      
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                          onClick={() => setShowModal(false)}
                          variant="outlined"
                          disabled={submitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={submitting}
                          startIcon={submitting ? <CircularProgress size={20} /> : <Send />}
                          sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 4,
                            },
                          }}
                        >
                          {submitting ? 'Sending...' : 'Submit Feedback'}
                        </Button>
                      </Box>
                    </form>
                  </Paper>
                </motion.div>
              </Modal>
            )}
          </AnimatePresence>
        </Container>

        <AnimatedToast
          open={toastOpen}
          message="Thank you for your feedback! We appreciate your input."
          type="success"
          title="Feedback Submitted"
          onClose={() => setToastOpen(false)}
        />
      </AnimatedPageWrapper>
    </ProtectedRoute>
  );
}
