import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, createTheme, FilledInput, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'

const FeedBackForm = () => {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

  return (
    <ThemeProvider theme={darkTheme}>
    <Container className='formContainer'>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Full Name</InputLabel>
            <Input />
            <FormHelperText>Please enter full name</FormHelperText>
            </FormControl>
      </div>
      <div>
      <FormControl sx={{ m: 1, width: '35ch' }}>
        <InputLabel>Email Address</InputLabel>
        <Input />
        <FormHelperText>We'll never share your email</FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Comment Down Below</InputLabel>
            <Input multiline rows={3}/>
            <FormHelperText>Give us your feedback</FormHelperText>
        </FormControl>
      </div>
    </Box>
    <div>
        <FormControl sx={{ display: "flex", flexWrap: "wrap", m: 1, width: '10ch' }}>
            <Button variant='outlined'>
                SUBMIT
            </Button>
        </FormControl>
      </div>
    </Container>
    </ThemeProvider>
  )
}

export default FeedBackForm;