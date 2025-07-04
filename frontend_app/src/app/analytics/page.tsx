'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  DirectionsWalk,
  Restaurant,
  Bedtime,
} from '@mui/icons-material';
import ProtectedRoute from '@/components/ProtectedRoute';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const statsCards = [
  {
    icon: <DirectionsWalk />,
    title: 'Average Steps',
    value: '8,340',
    change: '+12%',
    color: '#1976d2',
  },
  {
    icon: <Restaurant />,
    title: 'Avg Calories',
    value: '2,150',
    change: '+5%',
    color: '#ffb300',
  },
  {
    icon: <Bedtime />,
    title: 'Sleep Quality',
    value: '7.2h',
    change: '+8%',
    color: '#9c27b0',
  },
];

export default function AnalyticsPage() {
  const theme = useTheme();

  // Enhanced chart data with better styling
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: [8500, 7650, 9000, 7500, 8000, 8700, 9500],
        fill: false,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Calories Intake',
        data: [2100, 2250, 2000, 2200, 2150, 2300, 2050],
        fill: false,
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: 500,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      title: { 
        display: true, 
        text: 'Weekly Health Overview',
        font: {
          size: 18,
          weight: 600,
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.grey[200],
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          color: theme.palette.grey[200],
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <ProtectedRoute>
      <AnimatedPageWrapper>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
              Analytics Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Track your health progress over time
            </Typography>
          </motion.div>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
            {statsCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ color: stat.color, mr: 1 }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h6" component="h3" fontWeight={600}>
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" component="div" fontWeight={700} color="primary">
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'success.main',
                        fontWeight: 600,
                        mt: 1,
                      }}
                    >
                      {stat.change} from last week
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" component="h2" fontWeight={600}>
                  Weekly Trends
                </Typography>
              </Box>
              <Box sx={{ height: 400 }}>
                <Line data={data} options={options} />
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </AnimatedPageWrapper>
    </ProtectedRoute>
  );
}
