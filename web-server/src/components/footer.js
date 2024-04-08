/*
Ta Thanh Khuong: 103526664
*/
import React from 'react';
import { Typography } from '@mui/material';

const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333', 
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
}
export const Footer = () => {
  return (
    <footer  style={footerStyle}>
        <Typography variant="body2" align="center">
          &copy; 2023 Audit System 30049
        </Typography>
    </footer>
  );
};
