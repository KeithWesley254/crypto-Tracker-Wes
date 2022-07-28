import { Typography, ThemeProvider, createTheme, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const { currency } = CryptoState();

    const navigate = useNavigate();

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

    //confirm search matches the coins
    function handleSearch(){
        return coins.filter((coin) => {
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        })
    }

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

            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor: "gold"}} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Mkt Cap"].map((head) => (
                                        <TableCell
                                        style={{
                                            color: "black",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                        <TableRow
                                        onClick={() => navigate(`/coins/${row.id}`)}
                                        className="profitRow"
                                        key={row.name}
                                        >
                                            <TableCell 
                                            component="th" 
                                            scope='row'
                                            styles={{
                                                display: "flex",
                                                gap: 15,
                                            }}
                                            >
                                                <img 
                                                src={row.image}
                                                alt={row.name}
                                                height = "50"
                                                style={{ marginBottom: 10 }}
                                                />
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <span
                                                    style={{textTransform: "uppercase", fontSize: 22 }}
                                                    >
                                                        {row.symbol}
                                                    </span>

                                                    <span>
                                                        {row.name}
                                                    </span>
                                                 </div>

                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable