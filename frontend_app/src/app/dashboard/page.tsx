'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  LinearProgress,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  DirectionsWalk,
  LocalDrink,
  SelfImprovement,
  Add,
} from '@mui/icons-material';
import ProtectedRoute from '@/components/ProtectedRoute';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import { getSupabaseClient } from '@/lib/supabaseClient';
import Link from 'next/link';

interface SupabaseUser {
  email: string;
  user_metadata?: { full_name?: string };
  id: string;
}

const recommendations = [
  { icon: <LocalDrink />, text: 'Drink at least 2L water', progress: 65 },
  { icon: <DirectionsWalk />, text: 'Walk 8,000 steps minimum', progress: 45 },
  { icon: <SelfImprovement />, text: 'Add 15 minutes meditation', progress: 0 },
];

export default function DashboardPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user as SupabaseUser);
      }
    };
    fetchSession();
  }, []);

  return (
    <ProtectedRoute>
      <AnimatedPageWrapper>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'primary.main',
                  fontSize: '1.5rem',
                }}
              >
                {user?.user_metadata?.full_name?.charAt(0) || 'U'}
              </Avatar>
              <Box>
                <Typography variant="h4" component="h1" fontWeight={600}>
                  Welcome back, {user?.user_metadata?.full_name || 'User'}!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Ready to continue your wellness journey?
                </Typography>
              </Box>
            </Box>
          </motion.div>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="h2" fontWeight={600}>
                      Today&apos;s Recommendations
                    </Typography>
                  </Box>
                  
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ color: 'primary.main', mr: 1 }}>
                            {rec.icon}
                          </Box>
                          <Typography variant="body1" sx={{ flex: 1 }}>
                            {rec.text}
                          </Typography>
                          <Chip
                            label={`${rec.progress}%`}
                            size="small"
                            color={rec.progress > 50 ? 'success' : 'default'}
                          />
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={rec.progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            },
                          }}
                        />
                      </Box>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      component={Link}
                      href="/data-entry"
                      variant="contained"
                      startIcon={<Add />}
                      fullWidth
                      sx={{
                        py: 1.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 4,
                        },
                      }}
                    >
                      Add Health Data
                    </Button>
                    <Button
                      component={Link}
                      href="/analytics"
                      variant="outlined"
                      fullWidth
                      sx={{
                        py: 1.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2,
                        },
                      }}
                    >
                      View Analytics
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
                  Health Progress Overview
                </Typography>
                <Box
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: theme.palette.grey[50],
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  <Typography variant="h5" color="primary" fontWeight={600}>
                    Your analytics and progress charts coming soon!
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    We&apos;re working on bringing you comprehensive insights into your wellness journey
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </AnimatedPageWrapper>
    </ProtectedRoute>
  );
}
