/*
Ta Thanh Khuong: 103526664
Do Long Duy: 103802474
*/
import React, {useState} from 'react';
import { 
  Grid,
  TextField,
  Button, 
  Container,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem, 
  InputAdornment, 
  IconButton
} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

export const Signup = () => {
  const [username, setUsername] =useState('');
  const [password1, setPassword1] =useState('');
  const [password2, setPassword2] =useState('');
  const [email, setEmail] =useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('Client');
  const [expertise, setExpertise] = useState('Solidity');

  const [errorUser, setErrorUser] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);

  const [showPopup, setShowPopup] = useState(false);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    const numberPattern = /^[0-9\b]+$/;
    if (input ===''|| numberPattern.test(input)) {
      setPhoneNumber(input);
    }
  };
  const handleExpertise = (event) => {
    setExpertise(event.target.value);
  }
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSignUp = async (event) => {
    try {
      event.preventDefault();
      const validationClient = {
          username: username,
          password1: password1,
          password2: password2,
          email: email,
          phone: phoneNumber,
          user_type: userType
      };
      const validationAuditor = {
          username: username,
          password1: password1,
          password2: password2,
          email: email,
          phone: phoneNumber,
          user_type: userType,
          user_expertise: expertise
      };
      const signupValidation = userType === 'Client' ? validationClient : validationAuditor
      const response = await axios.post('http://localhost:5000/api/signup', signupValidation);
    
      const { success, userError, passwordError, emailError, phoneError } = response.data;

      if (success) {
        setShowPopup(true);
        // Clear form fields
        setUsername('');
        setPassword1('');
        setPassword2('');
        setEmail('');
        setPhoneNumber('');
        setUserType('Client');
        setExpertise('Solidity')
  
      } else {
        setErrorUser(userError);
        setErrorPassword(passwordError);
        setErrorEmail(emailError);
        setErrorPhone(phoneError);
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
        <h1>Sign Up</h1>
          <Grid item xs={12} >
            <TextField label="Username" value={username} onChange={handleUsernameChange} />
          </Grid>
          {errorUser && (
              <p style={{ color: 'red' }}>{errorUser}</p>
          )}
          <Grid item xs={12} >
          <TextField
            label="Password"
            value={password1}
            onChange={handlePassword1Change}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment style={{marginLeft:'-1.7rem'}}>
                  <IconButton onClick={handleTogglePasswordVisibility} edge={'end'} >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Re-enter password" value={password2} onChange={handlePassword2Change} type={showPassword ? 'text' : 'password'} 
            InputProps={{
            endAdornment: (
              <InputAdornment style={{marginLeft:'-1.7rem'}} >
                <IconButton onClick={handleTogglePasswordVisibility} edge={'end'} >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}/>
          </Grid>
          {errorPassword && (
              <p style={{ color: 'red' }}>{errorPassword}</p>
          )}
          <Grid item xs={12}>
            <TextField label="Email" type={'email'} value={email} onChange={handleEmailChange}/>
          </Grid>
          {errorEmail && (
              <p style={{ color: 'red' }}>{errorEmail}</p>
          )}
          <Grid item xs={12}>
            <TextField label="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange} inputProps={{ pattern: '^[0-9\b]+$', }}/>
          </Grid>
          {errorPhone && (
              <p style={{ color: 'red' }}>{errorPhone}</p>
          )}
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">User Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <FormControlLabel value="Client" control={<Radio />} label="Client" />
                <FormControlLabel value="Auditor" control={<Radio />} label="Auditor" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
          {userType === 'Auditor' && (
            <FormControl>
            <FormLabel id="exp-label">Expertise</FormLabel>
            <Select
              labelId="exp-label"
              id="exp-select"
              value={expertise}
              label="Expertise"
              onChange={handleExpertise}
            >
              <MenuItem value={'Solidity'}>Solidity</MenuItem>
              <MenuItem value={'Etherium'}>Etherium</MenuItem>
            </Select>
          </FormControl>
          )}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSignUp} style={{ background: '#023020', color: 'white' }}> Sign Up </Button>
          </Grid>
        </Grid>
      </div>
      {showPopup && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '40px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                border: '2px solid #023020',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
              }}
            >
              <h2 style={{color:'#023020'}}>Signup Successful!</h2>
              <CheckCircleOutlinedIcon style={{ fontSize: '4rem', color:'Green' }} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowPopup(false)}
                style={{ marginTop: '1rem' }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
    </Container>
  );
};
