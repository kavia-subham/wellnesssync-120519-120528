'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  DirectionsWalk,
  Bedtime,
  Restaurant,
  Notes,
  Save,
} from '@mui/icons-material';
import ProtectedRoute from '@/components/ProtectedRoute';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import AnimatedToast from '@/components/AnimatedToast';

interface HealthInputForm {
  steps?: number;
  sleep?: number;
  calories?: number;
  notes?: string;
}

const inputFields = [
  {
    name: 'steps' as keyof HealthInputForm,
    label: 'Steps',
    type: 'number',
    icon: <DirectionsWalk />,
    placeholder: 'e.g. 8500',
    min: 0,
  },
  {
    name: 'sleep' as keyof HealthInputForm,
    label: 'Sleep (hours)',
    type: 'number',
    icon: <Bedtime />,
    placeholder: 'e.g. 7.5',
    min: 0,
    step: 0.1,
  },
  {
    name: 'calories' as keyof HealthInputForm,
    label: 'Calories Intake',
    type: 'number',
    icon: <Restaurant />,
    placeholder: 'e.g. 2100',
    min: 0,
  },
];

export default function DataEntryPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<HealthInputForm>();
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const theme = useTheme();

  const onSubmit: SubmitHandler<HealthInputForm> = async () => {
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitting(false);
    setToastOpen(true);
    reset();
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
              Health Data Entry
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Track your daily health metrics to get personalized insights
            </Typography>
          </motion.div>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {inputFields.map((field, index) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-2px)' } }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ color: 'primary.main', mr: 1 }}>
                              {field.icon}
                            </Box>
                            <Typography variant="h6" component="h3" fontWeight={600}>
                              {field.label}
                            </Typography>
                          </Box>
                          <TextField
                            fullWidth
                            type={field.type}
                            placeholder={field.placeholder}
                            inputProps={{
                              min: field.min,
                              step: field.step,
                            }}
                            {...register(field.name)}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]?.message}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card sx={{ transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-2px)' } }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ color: 'primary.main', mr: 1 }}>
                            <Notes />
                          </Box>
                          <Typography variant="h6" component="h3" fontWeight={600}>
                            Notes
                          </Typography>
                        </Box>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          placeholder="Any additional notes about your health today..."
                          {...register('notes')}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Fitness tracker integration coming soon
                      </Typography>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={20} /> : <Save />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 4,
                          },
                        }}
                      >
                        {submitting ? 'Saving...' : 'Save Data'}
                      </Button>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>

        <AnimatedToast
          open={toastOpen}
          message="Health data saved successfully!"
          type="success"
          title="Success"
          onClose={() => setToastOpen(false)}
        />
      </AnimatedPageWrapper>
    </ProtectedRoute>
  );
}
