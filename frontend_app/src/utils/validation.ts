// PUBLIC_INTERFACE
export const validationRules = {
  /**
   * Common validation rules for forms
   */
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address',
    },
  },
  
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
  
  fullName: {
    required: 'Full name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
  },
  
  steps: {
    min: {
      value: 0,
      message: 'Steps cannot be negative',
    },
    max: {
      value: 100000,
      message: 'Steps value seems too high',
    },
  },
  
  sleep: {
    min: {
      value: 0,
      message: 'Sleep hours cannot be negative',
    },
    max: {
      value: 24,
      message: 'Sleep hours cannot exceed 24',
    },
  },
  
  calories: {
    min: {
      value: 0,
      message: 'Calories cannot be negative',
    },
    max: {
      value: 10000,
      message: 'Calories value seems too high',
    },
  },
  
  feedback: {
    required: 'Please enter your feedback',
    minLength: {
      value: 10,
      message: 'Feedback must be at least 10 characters',
    },
  },
};

// PUBLIC_INTERFACE
export const formatters = {
  /**
   * Common formatting utilities
   */
  currency: (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  },
  
  number: (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  },
  
  date: (date: Date | string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
  
  time: (date: Date | string): string => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },
  
  percentage: (value: number): string => {
    return `${Math.round(value)}%`;
  },
};
