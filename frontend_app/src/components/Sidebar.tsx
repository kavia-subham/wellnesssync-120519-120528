'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  Person,
  DataUsage,
  Analytics,
  Feedback,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { href: '/profile', label: 'Profile', icon: <Person /> },
  { href: '/data-entry', label: 'Data Input', icon: <DataUsage /> },
  { href: '/analytics', label: 'Analytics', icon: <Analytics /> },
  { href: '/feedback', label: 'Feedback', icon: <Feedback /> },
];

// PUBLIC_INTERFACE
export default function Sidebar({ children }: { children: React.ReactNode }) {
  /**
   * Enhanced sidebar navigation with Material UI components and animations
   */
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h5" component="h1" fontWeight={700} color="primary">
          WellnessSync
        </Typography>
      </Box>
      
      <List sx={{ flex: 1, pt: 2 }}>
        {navLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem
              component={Link}
              href={link.href}
              onClick={isMobile ? handleDrawerToggle : undefined}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                backgroundColor: pathname?.startsWith(link.href) 
                  ? 'primary.main' 
                  : 'transparent',
                color: pathname?.startsWith(link.href) 
                  ? 'primary.contrastText' 
                  : 'text.primary',
                '&:hover': {
                  backgroundColor: pathname?.startsWith(link.href) 
                    ? 'primary.dark' 
                    : 'action.hover',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ListItemIcon
                sx={{
                  color: pathname?.startsWith(link.href) 
                    ? 'primary.contrastText' 
                    : 'primary.main',
                  minWidth: 40,
                }}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText 
                primary={link.label}
                primaryTypographyProps={{
                  fontWeight: pathname?.startsWith(link.href) ? 600 : 500,
                }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            position: 'fixed', 
            top: 16, 
            left: 16, 
            zIndex: 1300,
            backgroundColor: 'background.paper',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: 'background.paper',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
      >
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {drawerContent}
      </Drawer>
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: 'background.default',
          minHeight: '100vh',
          ml: isMobile ? 0 : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
