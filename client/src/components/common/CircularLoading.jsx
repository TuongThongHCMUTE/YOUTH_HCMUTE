import React from 'react'
import { Box, CircularProgress } from '@mui/material';

const CircularLoading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
      <CircularProgress sx={{ color: 'var(--color-primary-400)'}}/>
    </Box>
  );
};

export default CircularLoading;