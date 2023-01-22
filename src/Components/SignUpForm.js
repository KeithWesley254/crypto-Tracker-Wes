import React, { useState } from 'react';
import { Grid, Box, FormControl, FormHelperText, TextField, Alert, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { UserState } from '../UserContext';

const SignUpForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { errors, isLoading, handleSubmitSignUp} = UserState();
  
  const { state } = useLocation();

  function handleSubmit(e){
    const data = {
      email,
      password,
      password_confirmation: passwordConfirmation,
    }
    handleSubmitSignUp(e, data, state)
  }

  return (
   <Box sx={{mt: 15}}>
    <p style={{fontWeight: "bolder", color: "#fff", fontSize: 50}}>Sign Up</p>
    <p style={{fontWeight: "bold", marginTop: 20, marginBottom: 20, color: "#fff", fontSize: 14}}>Join us to add your own events and participate</p>
      <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },
      '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: "gold",
       }, color: "#fff"
      }}>
        <form  onSubmit={handleSubmit}>
          <Box>
            <Grid container spacing={2} columns={12}>
               <Grid item xs={12} md={6}>

              <FormControl>
                <TextField 
                type="email"
                variant="outlined"
                label="Email"
                id="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />
                <FormHelperText id="my-helper-text">name@example.com</FormHelperText>
              </FormControl>
              <br />
              <FormControl>
                <TextField 
                type="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <FormHelperText id="my-helper-text">min. 8 characters</FormHelperText>
              </FormControl>
              <br />
              <FormControl>
                <TextField 
                type="password"
                label="Password Confirmation"
                id="passwordConfirmation"
                autoComplete="current-password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <FormHelperText id="my-helper-text">Please Confirm Your Password</FormHelperText>
              </FormControl>
               </Grid>
            </Grid>
            <div>
              <div>
                <FormControl sx={{width: "50%"}}>
                  <Button 
                  sx={{ 
                    width: "100%",
                    height: "50%",
                    my: 2,
                    color: "#161b21",
                    backgroundColor: "gold",
                    "&:hover": {backgroundColor: "gold", }
                  }}
                  type='submit'
                  >
                    {isLoading ? "Loading..." : "Sign Up"}
                  </Button>
                </FormControl>
                <div>
                  {errors.map((err) => (
                  <div key={err}>
                      <Alert severity="error" sx={{ width: '100%' }}>
                        {err}
                      </Alert>
                  </div>
                  ))}
                </div>
              </div>
            </div>
            </Box>
          </form>
      </Box>
   </Box>
  )
}

export default SignUpForm;