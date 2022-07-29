import { createTheme } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { ThemeProvider } from 'styled-components';

const FeedBackComments = () => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    })

  return (
    <ThemeProvider theme={darkTheme}>
        <Container className="commentContainer">
            <div>Hello</div>
        </Container>
    </ThemeProvider>
  )
}

export default FeedBackComments;