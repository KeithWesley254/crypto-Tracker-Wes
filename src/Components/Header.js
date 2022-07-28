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
                    variant="h6"
                    >
                        Crypto Tracker
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