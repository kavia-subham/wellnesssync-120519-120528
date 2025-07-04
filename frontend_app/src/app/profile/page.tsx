'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  Person,
  Email,
  CalendarToday,
  Security,
} from '@mui/icons-material';
import { getSupabaseClient } from '@/lib/supabaseClient';
import ProtectedRoute from '@/components/ProtectedRoute';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';

interface ProfileInfo {
  email: string;
  name: string;
  id: string;
  createdAt?: string;
}



export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setProfile({
        email: user.email as string,
        name: user.user_metadata?.full_name ?? '',
        id: user.id as string,
        createdAt: user.created_at ? new Date(user.created_at).toLocaleDateString() : undefined,
      });
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </ProtectedRoute>
    );
  }

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
              My Profile
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Manage your account information and preferences
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
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
                  <CardContent sx={{ p: 4 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                    >
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          fontSize: '2.5rem',
                          bgcolor: 'primary.main',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {profile?.name?.charAt(0) || 'U'}
                      </Avatar>
                    </motion.div>
                    <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
                      {profile?.name || 'User'}
                    </Typography>
                    <Chip
                      label="Active Member"
                      color="success"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Member since {profile?.createdAt || 'Recently'}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card sx={{ mb: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Person sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="h6" component="h3" fontWeight={600}>
                        Personal Information
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Email sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={500}>
                          {profile?.email}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <CalendarToday sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            Member Since
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={500}>
                          {profile?.createdAt || 'Recently'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Security sx={{ color: 'success.main', mr: 1 }} />
                      <Typography variant="h6" component="h3" fontWeight={600}>
                        Account Security
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label="Email Verified"
                        color="success"
                        size="small"
                        sx={{ mr: 2 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Your email address has been verified
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="body2" color="text.secondary">
                      Account ID: {profile?.id}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </AnimatedPageWrapper>
    </ProtectedRoute>
  );
}
