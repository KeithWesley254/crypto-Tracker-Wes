import React, { useState } from 'react'
import { Grid, Box, Button } from '@mui/material';
import LoginForm from '../Components/LoginForm';
import SignUpForm from '../Components/SignUpForm';
import CryptoImage from '../assets/images/crypto-asset-2.jpg'

const Login = () => {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <main>
        <Box >
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} sx={{color: "#fff"}} md={6}>

              {showLogin ? (
                <>
                <div className='loginForm'>
                  <LoginForm />
                </div>
                <div className='loginForm'>
                  <p>
                    Don't have an account? &nbsp;
                    <Button disableRipple sx={{bgcolor: "transparent", color:  "gold", "&:hover": {backgroundColor: "transparent"}}} onClick={() => setShowLogin(false)}>
                      Sign Up
                    </Button>
                  </p>
                </div>
                </>
              ): (
                <>
                <div className='loginForm'>
                  <SignUpForm />
                </div>
               
                <div className='loginForm'>
                  <p>
                    Already have an account? &nbsp;
                    <Button disableRipple sx={{bgcolor: "transparent", color:  "gold", "&:hover": {backgroundColor: "transparent"}}} onClick={() => setShowLogin(true)}>
                      Log In
                    </Button>
                  </p>
                </div>
                </>
              )}

            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{height: "100%", display: {xs: 'none', md: 'block'}, width: "100%"}}>
                <img src = {CryptoImage} alt='crypto asset gold'/>
              </Box>
            </Grid>
          </Grid> 
        </Box>
      </main>
    </>
  )
}

export default Login;