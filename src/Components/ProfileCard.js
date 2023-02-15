import { Avatar, Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../UserContext';

const ProfileCard = ({ userProfile, setIsProfile }) => {
    const { user, logOut } = UserState();
    const [maStory, setMaStory] = useState(false);

    const navigate = useNavigate();

    function handleDelete(){
        const token = JSON.parse(localStorage.getItem("token"));
    
        fetch(`https://txc-feedback-api.onrender.com/api/users/${user.id}`,{
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        navigate(`/`);
        logOut();
    }

  return (
    <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Card
                className="homeCard"
                sx={{
                    mt: 15,
                    width: {md: "60%", xs: "90%"},
                    height: 500,
                    textAlign: "center",
                    bgcolor: "#13161a",
                    cursor: "pointer",
                    overflowY: "scroll",
                    "&:hover": {boxShadow: "gold 0px 22px 70px 4px", }
                }}
                >
                    <Box sx={{
                        display:'flex', 
                        justifyContent:'center',
                        width: {xs:"100%", md: "100%"},
                        height: {xs:"75%", md: "70%"}
                    }}>
                        <Avatar 
                        sx={{
                        height: {xs:"80%", md: "80%"},
                        mt: 2,
                        width: {xs: "80%", md: "75%"},
                        }}
                        src={userProfile?.image_upload}
                        alt={userProfile?.full_name}
                        />
                    </Box>

                    <Container>
                        <Typography sx={{color: "#fff", fontSize: {xs: 25, md: 30}, fontWeight: "bolder"}}>
                            {userProfile?.full_name}
                        </Typography>
                    </Container>

                    <Container sx={{mt: 2, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <Button
                        sx={{
                            mx: 2,
                            width: "50%",
                            color: "#161b21",
                            backgroundColor: "gold",
                            "&:hover": {backgroundColor: "gold", }
                        }}
                        onClick={() => {
                            setIsProfile(false)
                        }}
                        >
                            Edit Profile
                        </Button>
                        <Button
                        sx={{
                            mx: 2,
                            width: "50%",
                            backgroundColor: "red",
                            color: "#fff",
                            "&:hover": {backgroundColor: "black", }
                        }}
                        onClick={() => {
                            setMaStory(true)
                        }}
                        >
                            Delete Account
                        </Button>
                    </Container>
                    <Dialog 
                    open={maStory}
                    >
                      <Box sx={{bgcolor: "#565765"}}>
                        <DialogTitle sx={{color: "red", textAlign: "center", fontSize: 20}}>
                          WARNING
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText sx={{color: "#fff"}}>
                            <b>Are You Sure you want to DELETE your Account? This Action cannot be undone!</b>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                              onClick={() => {
                                setMaStory(false)
                              }}
                              sx={{  
                                width: "100%",
                                height: "50%",
                                color: "#161b21",
                                backgroundColor: "gold",
                                "&:hover": {backgroundColor: "gold", }
                              }}
                              >
                                Go Back
                          </Button>
                          <Button
                            onClick={(e) => {
                              handleDelete(e)
                              setMaStory(false)
                            }}
                            sx={{  
                              width: "100%",
                              height: "50%",
                              backgroundColor: "red",
                              color: "#fff",
                              "&:hover": {backgroundColor: "black", }
                            }}
                            >
                              Delete Account
                          </Button>
                        </DialogActions>
                      </Box>
                      
                    </Dialog>
                </Card>
            </Box>
        </Grid>
    </Grid>
        
  )
}

export default ProfileCard