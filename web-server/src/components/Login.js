/*
Ta Thanh Khuong: 103526664
Do Long Duy: 103802474
*/
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { 
  Grid,
  TextField,
  Button, 
  Container,
  InputAdornment, 
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

export const Login = ({ setLoggedIn, setUserData }) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

      const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


  const navigate = useNavigate();
    const handleLogin = async () => {
      try {
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
    
        if (usernameInput === '' || passwordInput === '') {
          setError('Username and password cannot be empty');
          return;
        }
    
        const response = await axios.post('http://localhost:5000/api/login', {
          username: usernameInput,
          password: passwordInput
        });
    
        const { success, error, userData } = response.data;
    
        if (success) {
          setLoggedIn(true);
          setUserData(userData);
          navigate('/');
        } else {
          setError(error);
        }
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <Container>
      <div style={{ 
        padding: '2.5rem', 
        marginTop: '20rem', 
        background: '#9AACA6',
        borderRadius: '40px',
        width: '50%', 
        margin: ' 20rem auto', 
      }}>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
        <h1>Login</h1>
          <Grid item xs={12}>
            <TextField id="username" label="Username"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField id='password' label="Password" type={showPassword ? 'text' : 'password'} 
            InputProps={{
              endAdornment: (
                <InputAdornment style={{marginLeft:'-1.7rem'}}>
                  <IconButton onClick={handleTogglePasswordVisibility} edge={'end'} >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}/>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <p style={{ color: 'red' }}>{error}</p>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
            onClick={handleLogin}
            style={{ background: '#023020', color: 'white' }}> Login </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
