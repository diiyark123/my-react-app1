import React, {  useState } from 'react';
import './style.css';
import axios from 'axios';

export default function Login() {
  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [email, setEmail] = useState('');
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [otp, setOtp] = useState('');
  console.log(showOtpPage)


  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  function handleLoginSubmit(event)  {
    event.preventDefault();
    if (email === 'travedesk@gmail.com') {
      // Generate and send OTP to the user
      setShowOtpPage(true);
      // handleSignInClick(false);
      setIsSignUpMode(false);
      
      axios.post('http://localhost:3000/api/hbsendmail/',{"mailid":"travedesk@gmail.com"})
      .then(response => console.log(response))
      .catch(err => console.log(err))

    } else {
      // Handle incorrect email logic
      alert('Invalid email');
    }
  };



  const handleOtpSubmit = (event) => {
    event.preventDefault();
    // Verify OTP logic
    if (otp === '123456') {
      alert('OTP verified successfully. Login successful!');
      // Redirect to the logged-in page
      setShowOtpPage(false); 
         
    } 
    else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className={`signin-signup ${showOtpPage ? 'right-panel-active' : ''}`}>
        {isSignUpMode &&
          <div className="signin">
            <form onSubmit={handleLoginSubmit} className="sign-in-form">
              <h2 className="title">Let's Check In!</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
      
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <button type="submit" className="btn solid"> Login </button>
            </form>
          </div>}
          {showOtpPage &&
          <div className="otp">
            <form onSubmit={handleOtpSubmit} className="otp-form">
              <h2 className="title">Enter OTP</h2>
              <div className="input-field">
                <i className="fas fa-key"></i>
                <input
                  // type="number"
                  placeholder="OTP"
                  value={otp}
                  onChange={(event) => {
                    console.log(event.target.value);
                    // handleOtp(event.target.value)
                    setOtp(event.target.value);
                  }}
                />
              </div>
              <input type="submit" className="btn" value="Verify OTP" />
            </form>
          </div>}
        </div>
      </div>


      <div className={`panels-container ${showOtpPage ? 'panels-container-right' : ''}`}>
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Drop us your Domain❤️</p>
            <button onClick={handleSignUpClick} className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Sign in and Start your Travel💜</p>
            <button onClick={handleSignInClick} className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


