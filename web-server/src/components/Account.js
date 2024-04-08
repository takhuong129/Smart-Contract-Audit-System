/*
Ta Thanh Khuong: 103526664
Do Long Duy: 103802474
*/
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { AccountBalanceWallet, Email, Phone } from '@mui/icons-material';

export const Account = ({ userData }) => {
    const user = userData;
    const title = user.user_expertise ? `${user.user_expertise} ${user.user_type}` : `${user.user_type}`;

    return (
        <Container style={{ marginTop: '10rem' }}>
            <Paper elevation={3} style={{ padding: '2rem', borderRadius: '10px' }}>
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                    <AccountBalanceWallet style={{ fontSize: '4rem', color: '#ff9900' }} />
                    <Typography variant="h4" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                        Welcome {title} {user.username}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Address: 0x2170Ed0880ac9A755fd29B2688956BD959F933F8 
                    </Typography>
                </Box>
                <Box mt={3}>
                    <Typography variant="body1">
                        <Email style={{ fontSize: '1.2rem', marginRight: '0.5rem' }} />
                        Email: {user.email}
                    </Typography>
                    <Typography variant="body1">
                        <Phone style={{ fontSize: '1.2rem', marginRight: '0.5rem' }} />
                        Phone: {user.phone}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};
