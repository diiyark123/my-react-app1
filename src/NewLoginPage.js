import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';


const NewLoginPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setworkEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setErrorMessage('');
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setErrorMessage('');
  };

  const handleEmailChange = (event) => {
    setworkEmail(event.target.value);
    setErrorMessage('');
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setErrorMessage('');
  };

  const handleLogin = () => {
    if (firstName.trim() === '' || lastName.trim() === '' || workEmail.trim() === '') {
      setErrorMessage('Please fill in all the fields');
    } else {
      // Perform login logic here
      console.log('Performing login...');
      // Redirect the user to the desired page after successful login
      window.location.href = '/dashboard';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',marginBottom: '1rem' }}>
      <h2>Looks like your company has not signed up yet ..</h2>
      <TextField
        label="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
        style={{ marginBottom: '1rem',width:'350px' }}
        
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
        style={{ marginBottom: '1rem',width:'350px' }}
        
      />
      <TextField
        label="Work Email"
        type="email"
        value={workEmail}
        onChange={handleEmailChange}
        style={{ marginBottom: '1rem',width:'350px' }}
        
      />

<TextField
  label="Phone Number"
  value={phoneNumber}
  onChange={handlePhoneNumberChange}
  style={{ marginBottom: '1rem',width:'350px' }}
/>


      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <br />
      <br />
      <Button id='but' variant="contained" onClick={handleLogin}  >
        Submit
      </Button>
    </div>
  );
};

export default NewLoginPage;
