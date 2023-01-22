import { Box, Grid, Typography, FormControl, Avatar, Button } from '@mui/material'
import React from 'react'
import { UserState } from '../UserContext';

const FeedBackComments = ({ commentEd, deleteComm }) => {

    const { user } = UserState();

    const allUserComments = commentEd?.map((comment) => {
        return (
          <Box key={comment.id}>
          <Grid container spacing={2} columns={6}>
              <Grid item xs={6} md={6}>
                <Box sx={{ pt: 10}}>
                  <Grid container spacing={2} columns={6}>
                    <Grid item xs={2} md={2}>
                      <Box sx={{display: "flex", justifyContent: "center"}}>
                          <Avatar alt={comment?.full_name} src={comment?.image_upload} />
                      </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Box sx={{ml: 4, mr: 4 }}>
                        <Typography>
                          {comment?.user_comment}
                        </Typography>
                        { user.id === comment.user_id ?
                          (
                            <>
                            <Box sx={{ textAlign: "center", my: 2, display: "flex", justifyContent: "end", mr: 2}}>
                              <FormControl>
                                <Button 
                                variant='contained'
                                color='error'
                                onClick={() => {
                                  deleteComm(comment.id)
                                }}
                                >
                                  DELETE
                                </Button>
                              </FormControl>
                            </Box>
                            </>
                          ) : (
                            <>
                              <Box>
                                <p>- <i>{comment.full_name}</i></p>
                              </Box>
                            </>
                          )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>      
              </Grid>
            </Grid>
          </Box>
        )
      })
    
  return (
    <>
        <div 
        style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold", color: "gold", }}
        >
            <i>What People are Saying</i>
        </div>
        <div className='heroScroll' style={{ overflowY: "auto", maxHeight: 1000}}>
          {allUserComments}
        </div>
    </>
  )
}

export default FeedBackComments;