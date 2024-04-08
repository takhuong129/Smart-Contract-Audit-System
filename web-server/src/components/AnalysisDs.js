import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Button, Typography,Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AnalysisDs = () => {
  const navigate = useNavigate();
  const navigateHR = () => {
    navigate('/report-history');
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: '45vh', width: '35vw'}}
      >
        <CheckCircleIcon style={{ fontSize: '8rem', color: 'green' }} />
        <Typography variant="h4" style={{ color: 'green', marginBottom: '1rem' }}>
          Success!
        </Typography>
        <Typography variant="h5" style={{ color: 'grey', marginBottom: '1rem' }}>
          File analysis complete
        </Typography>
        <Divider style={{ width: '100%', marginBottom: '1rem' }} />
        <Button
          style={{ background: 'green', color: 'white', padding: '1rem 3rem', fontSize: '1.rem', marginTop: '1rem' }}
          onClick={navigateHR}
        >
          Save & Exit
        </Button>
      </Grid>
    </Container>
  );
};
