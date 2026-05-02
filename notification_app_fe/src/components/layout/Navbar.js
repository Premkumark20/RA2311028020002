import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

function Navbar() {
  const navbarStyle = {
    backgroundColor: '#1976d2',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: '1.5rem'
  };

  return (
    <AppBar position="static" style={navbarStyle}>
      <Toolbar>
        <Typography variant="h6" component="div" style={titleStyle}>
          Notification System
        </Typography>
        <Box>
          <Typography variant="body2" style={{ color: 'white' }}>
            Real-time Updates
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
