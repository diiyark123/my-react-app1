import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import './index.css';


const OTPPromptPage = () => {
  const [otp, setOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);

  useEffect(() => {
    let timer = null;
    if (resendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [resendDisabled]);

  const handleOTPChange = (event) => {
    const numericOTP = event.target.value.replace(/\D/g, '');
    setOTP(numericOTP);
    setErrorMessage('');
  };

  const handleVerifyOTP = () => {
    if (otp.trim() === '') {
      setErrorMessage('Please enter the OTP');
    } else {
      // You can add your OTP verification logic here
      console.log('Verifying OTP...');
      // Redirect the user to the desired page after successful verification
      window.location.href = '/dashboard';
    }
  };

  

  const handleResendOTP = () => {
    // Logic to resend the OTP
    console.log('Resending OTP...');
    setResendDisabled(true);
    setResendTimer(30);
    setTimeout(() => {
      setResendDisabled(false);
    }, 30000); 
  };

  return (
    <div className="otp-prompt-container">
      <div className="otp-prompt-content">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2 className="otp-prompt-heading" >Enter the OTP</h2>
       
      <TextField label="OTP" type="text" value={otp} id='otp' onChange={handleOTPChange} inputMode="numeric"/>
      {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
      <br />
      <br />

      <div className="button-container">
      <Button variant="contained" className="verify-button" onClick={handleVerifyOTP} sx={{ backgroundColor: '#7862dc', '&:hover': { backgroundColor: '#a58df8' }}} >
        Verify OTP
      </Button>
     
      <br />
      <Button variant="text" onClick={handleResendOTP} className="resend-button" disabled={resendDisabled} sx={{ fontSize: '12px' }}>
        {resendDisabled ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
      </Button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default OTPPromptPage;