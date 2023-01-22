import { Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import FeedBackComments from '../Components/FeedBackComments'
import FeedBackForm from '../Components/FeedBackForm'
import { UserState } from '../UserContext';
import ProfileCombo from '../Components/ProfileCombo';

function FeedBackPage(){

  const [commentsZ, setCommentsZ] = useState([])

  const { userProfile } = UserState();

    useEffect(() => {
        fetch('http://feedback-loadbalancer-1037602220.eu-west-2.elb.amazonaws.com/api/feedbacks')
        .then(r => r.json())
        .then(data => setCommentsZ(data))
    }, []);

    function handlePosting(data){
        setCommentsZ([...commentsZ, data])
    }

    function deleteComm(id){

      const token = JSON.parse(localStorage.getItem("token"));

        fetch(`http://feedback-loadbalancer-1037602220.eu-west-2.elb.amazonaws.com/api/feedbacks/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "DELETE",
        })
        .then(r => r.json())
        .then(() => {
            const goThru = commentsZ.filter((comment) => comment.id !== id)
                setCommentsZ(goThru)
            })
        }

      if (userProfile && userProfile.user_id){
        return (
          <Grid container spacing={2} columns={12}>

            <Grid item xs={12} md={6}>
              <ProfileCombo />
            </Grid>
  
            <Grid item xs={12} md={6}>

              <Box sx={{mt: 2 }}>
                <FeedBackForm handlePosting={handlePosting} />
              </Box>

              <Box sx={{mt: 2}}>
                <FeedBackComments commentEd={commentsZ} deleteComm={deleteComm}/>
              </Box>

            </Grid>
  
          </Grid>
      )
      }else{
        return (
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} md={12}>
              <Box sx={{mt: 2}}>
                <Typography sx={{textAlign: "center"}}>
                  <i>Please login to join the conversation...</i>
                </Typography>
              </Box>
              <Box sx={{mt: 2}}>
                <FeedBackComments commentEd={commentsZ} deleteComm={deleteComm}/>
              </Box>
            </Grid>
          </Grid>
        )
      }
      
    
}

export default FeedBackPage;