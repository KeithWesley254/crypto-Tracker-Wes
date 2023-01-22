import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react'
import { UserState } from '../UserContext';

const FeedBackForm = ({ handlePosting }) => {

    const { user, userProfile } = UserState();

    const [formData, setFormData] = useState({
        full_name: userProfile?.full_name,
        email: user.email,
        user_comment: '',
        user_id: user.id,
        image_upload: userProfile.image_upload
    })

    function handleSubmit(e){
        const token = JSON.parse(localStorage.getItem("token"));

        e.preventDefault();
        fetch('http://feedback-loadbalancer-1037602220.eu-west-2.elb.amazonaws.com/api/feedbacks',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                full_name: formData.full_name,
                email: user.email,
                user_comment: formData.user_comment,
                user_id: user.id,
                image_upload: userProfile.image_upload
            })
        })
        .then(r => r.json())
        .then(data => {
            handlePosting(data)
        })

        setFormData({
            full_name: '',
            user_comment: '',
        })
    }

    function handleChange(e){
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    }
  return (
    <>
    <Container className='formContainer'>
    <div 
    style={{ fontSize: "20px", fontWeight: "bold", color: "gold", }}
    >
        <i>FeedBack Form</i>
    </div>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Full Name</InputLabel>
            <OutlinedInput label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange}/>
            <FormHelperText>Please enter full name</FormHelperText>
            </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '35ch' }}>
            <InputLabel>Comment Down Below</InputLabel>
            <OutlinedInput label="Comment Down Below" name="user_comment" value={formData.user_comment} multiline rows={3} onChange={handleChange}/>
            <FormHelperText>Give us your feedback</FormHelperText>
        </FormControl>
      </div>
    </Box>
    <div>
        <FormControl>
            <Button 
            sx={{
            color: "#161b21",
            backgroundColor: "gold",
            "&:hover": {backgroundColor: "gold", }
            }} 
            type='submit' onClick={handleSubmit}>
                SUBMIT
            </Button>
        </FormControl>
      </div>
    </Container>
    </>
  )
}

export default FeedBackForm;