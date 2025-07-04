'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { getSupabaseClient } from '@/lib/supabaseClient';
import Link from 'next/link';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import AnimatedToast from '@/components/AnimatedToast';

interface RegisterInputForm {
  email: string;
  password: string;
  fullName: string;
}

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputForm>();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const theme = useTheme();

  const onSubmit = async (data: RegisterInputForm) => {
    setSubmitting(true);
    setErrorMsg('');
    setSuccess(false);
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.fullName } }
    });
    setSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
      setToastType('error');
      setToastOpen(true);
    } else {
      setSuccess(true);
      setToastType('success');
      setToastOpen(true);
    }
  };

  return (
    <AnimatedPageWrapper>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <PersonAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                </motion.div>
                <Typography variant="h4" component="h1" fontWeight={600} color="primary">
                  Join WellnessSync
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Create your account to start your wellness journey
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    autoComplete="email"
                    sx={{ mb: 2 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <TextField
                    fullWidth
                    label="Full Name"
                    type="text"
                    margin="normal"
                    {...register('fullName', { required: 'Full name is required' })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    autoComplete="name"
                    sx={{ mb: 2 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="new-password"
                    sx={{ mb: 3 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    sx={{
                      py: 1.5,
                      mb: 3,
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    {submitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Typography variant="body2" align="center" color="text.secondary">
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                      Sign in here
                    </Link>
                  </Typography>
                </motion.div>
              </form>
            </Paper>
          </motion.div>
        </Box>
      </Container>

      <AnimatedToast
        open={toastOpen}
        message={
          success 
            ? 'Registration successful! Please check your email to confirm your account.' 
            : errorMsg
        }
        type={toastType}
        title={success ? 'Success' : 'Registration Error'}
        onClose={() => setToastOpen(false)}
      />
    </AnimatedPageWrapper>
  );
}
