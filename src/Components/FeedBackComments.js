import { Button, ButtonGroup, createTheme, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { ThemeProvider } from 'styled-components';

const FeedBackComments = ({ commentEd, deleteComm }) => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    })

    const displayComments = commentEd.map((comment) => {

        function handleDelete(){
            deleteComm(comment.id)
        }

        return (
            <div key={comment.id}>
                <div>
                    <Typography variant="h3">
                        {comment.fullName}
                    </Typography>
                </div>
                <br />
                <div>
                    <Typography variant="body1">
                        {comment.comment}
                    </Typography>
                </div>
                <br />
                <div>
                    <Button color='error' sx={{color: "#ff0101",}} variant='outlined' onClick={handleDelete}>Delete</Button>
                </div>
            </div>
        )
    })
    
  return (
    <ThemeProvider theme={darkTheme}>
        <Container className="commentContainer">
            <div 
            style={{ fontSize: "20px", fontFamily: "'Carter One', cursive", fontWeight: "bold", color: "gold", }}
            >What people are saying</div>
            <br />
            <div>{displayComments}</div>
        </Container>
    </ThemeProvider>
  )
}

export default FeedBackComments;