import { Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();

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

    function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //confirm search matches the coins
    function handleSearch(){
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )
    }

  return (
    <>
        <Container style={{textAlign: "center"}}>
            <Typography
            variant="h5"
            style={{margin: 18, fontFamily: "Montserrat"}}
            >
                Cryptocurrencies Ranked by Market Cap
            </Typography>
            <Typography
            variant="subtitle2"
            style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
            }}
            >
                Click on a coin for more information
            </Typography>

            <TextField 
            label="Search for a coin ..."
            variant='outlined'
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
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
                                { handleSearch()
                                //1-1=0 then 0*10=0, then 0 + 10 to display the first 10 items
                                //eg we are in page 2: 
                                //2-1=1 then 1*10=10 (After 10 items) Display next items 2-1=1 1*10=10 10+10=20
                                //which are 10 items after the first 10 items
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {

                                    const profit = row.price_change_percentage_24h > 0;
                                    // console.log(row)

                                    return (
                                        <TableRow
                                        onClick={() => navigate(`/coins/${row.id}`)}
                                        className="profitRow"
                                        key={row.name}
                                        >
                                            <TableCell 
                                            component="th" 
                                            scope='row'
                                            style={{
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

                                                    <span style={{ color: "darkgrey" }}>
                                                        {row.name}
                                                    </span>
                                                 </div>
                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell
                                            align = "right"
                                            style = {{
                                                color: profit > 0 ? "#01f704" : "#ff0101",
                                                fontWeight: 500,
                                            }}
                                            >
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol}{" "}
                                                {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                                Million
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>

            <Pagination 

            className="pagiNation"
            style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}
            count={(handleSearch().length/10).toFixed(0)}
            onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
            }}
            />

        </Container>
    </>
  )
}

export default CoinsTable