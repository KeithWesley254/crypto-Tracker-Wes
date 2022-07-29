import { Box, Button, createTheme, FormControl, FormHelperText, Input, InputLabel, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react'

const FeedBackForm = ({ handlePosting }) => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        comment: '',
    })

    function handleSubmit(e){
        e.preventDefault();
        fetch('https://phase2-api.herokuapp.com/userdata',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(data => {
            handlePosting(data)
        })

        setFormData({
            fullName: '',
            email: '',
            comment: '',
        })
    }

    function handleChange(e){
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    }
  return (
    <ThemeProvider theme={darkTheme}>
    <Container className='formContainer'>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Full Name</InputLabel>
            <Input name="fullName" value={formData.fullName} onChange={handleChange}/>
            <FormHelperText>Please enter full name</FormHelperText>
            </FormControl>
      </div>
      <div>
      <FormControl sx={{ m: 1, width: '35ch' }}>
        <InputLabel>Email Address</InputLabel>
        <Input name="email" value={formData.email} onChange={handleChange}/>
        <FormHelperText>We'll never share your email</FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Comment Down Below</InputLabel>
            <Input name="comment" value={formData.comment} multiline rows={3} onChange={handleChange}/>
            <FormHelperText>Give us your feedback</FormHelperText>
        </FormControl>
      </div>
    </Box>
    <div>
        <FormControl sx={{ display: "flex", flexWrap: "wrap", m: 1, width: '10ch' }}>
            <Button variant='outlined' type='submit' onClick={handleSubmit}>
                SUBMIT
            </Button>
        </FormControl>
      </div>
    </Container>
    </ThemeProvider>
  )
}

export default FeedBackForm;