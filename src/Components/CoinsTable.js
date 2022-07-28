import { Typography, ThemeProvider, createTheme, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const { currency } = CryptoState();

    useEffect(() => {
        setLoading(true);

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(r => r.json())
        .then(data => {
            setCoins(data);
            setLoading(false);
        })
    }, [currency])

    // console.log (coins)

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: "center"}}>
            <Typography
            variant="h5"
            style={{margin: 18, fontFamily: "Montserrat"}}
            >
                Cryptocurrencies Ranked by Market Cap
            </Typography>

            <TextField 
            label="Search for a coin ..."
            variant='outlined'
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value)}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable