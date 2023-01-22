import { Alert, Box, Button, FormControl, FormHelperText, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { UserState } from '../UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isLoading, handleSubmitLogin} = UserState();

  const { state } = useLocation();

  function handleSubmit(e){
    const data = {
      email,
      password
    }
    handleSubmitLogin(e, data, state)
  }

  return (
    <>
      <Box sx={{mt: 20}}>
        <main>
        <form onSubmit = {handleSubmit}>
          <p style={{fontWeight: "bolder", color: "#fff", fontSize: 60}}>Login</p>
          <p style={{fontWeight: "bold", marginTop: 20, marginBottom: 20, color: "#fff", fontSize: 14}}>Sign in with the data you entered during your registration</p>
          <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: "gold",
           }, color: "#fff"
          }}>
          
            <div>
              
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
                <FormHelperText>name@example.com</FormHelperText>
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
                <FormHelperText>min. 8 characters</FormHelperText>
              </FormControl>
            </div>
          </Box>
          
          <br />
          <br />
          <div>
            <FormControl sx={{width: "50%"}}>
              <Button 
              sx={{ 
                width: "100%",
                height: "50%",
                color: "#161b21",
                backgroundColor: "gold",
                "&:hover": {backgroundColor: "gold", }
              }}
              type="submit"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
              <br />
            </FormControl>  
            <div>
              {errors.map((err) => (
              <div key={err}>
                <Alert key={err} severity="error" sx={{ width: '100%' }}>
                  {err}
                </Alert>
              </div>
              ))}
            </div>       
          </div>
          </form>
        </main>
      </Box>
    </>
  )
}

export default LoginForm;