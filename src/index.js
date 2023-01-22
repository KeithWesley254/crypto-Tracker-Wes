import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material";
import CryptoContext from './CryptoContext';
import UserContext from './UserContext';
import './index.css';
import App from './App';
import 'react-alice-carousel/lib/alice-carousel.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CryptoContext>
          <UserContext>
            <App />
          </UserContext>  
        </CryptoContext>   
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
