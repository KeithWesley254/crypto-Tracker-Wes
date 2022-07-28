import { AppBar, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

function Header(){

    const navigate = useNavigate()

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const {currency, setCurrency} = CryptoState()
    
    // console.log (currency)

    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography 
                    onClick={() => navigate("/")}
                    className="typoTracker"
                    style= {{ fontFamily: "Teko, sans-serif", fontSize: "30px" }}
                    variant="h6"
                    >
                        Crypto Tracker
                    </Typography>

                    <Typography 
                    onClick={() => navigate("/feedback")}
                    style={{
                        flex: "1",
                        color: "gold",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontFamily: "Teko, sans-serif", fontSize: "30px",
                    }}
                    >
                        FeedBack
                    </Typography>

                    <Select 
                    variant="outlined"
                    style={{
                        width: 100,
                        height: 40,
                        marginRight: 15,
                    }}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"BTC"}>BTC</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header;