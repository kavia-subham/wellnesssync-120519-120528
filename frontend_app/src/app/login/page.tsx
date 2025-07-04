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
import { Login as LoginIcon } from '@mui/icons-material';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import AnimatedToast from '@/components/AnimatedToast';

interface LoginInputForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputForm>();
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const onSubmit = async (data: LoginInputForm) => {
    setErrorMsg('');
    setSubmitting(true);
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });
    setSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
      setToastOpen(true);
    } else {
      router.push('/dashboard');
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
                  <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                </motion.div>
                <Typography variant="h4" component="h1" fontWeight={600} color="primary">
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Sign in to continue your wellness journey
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
                    label="Password"
                    type="password"
                    margin="normal"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="current-password"
                    sx={{ mb: 3 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
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
                      'Sign In'
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Typography variant="body2" align="center" color="text.secondary">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                      Create one here
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
        message={errorMsg}
        type="error"
        title="Authentication Error"
        onClose={() => setToastOpen(false)}
      />
    </AnimatedPageWrapper>
  );
}
