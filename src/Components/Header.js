import { AppBar, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header(){

    const navigate = useNavigate()

    const darkTheme = createTheme({
        palette: {
            primary:{
                main: "#fff",
            },
            type: "dark",
        }
    })
    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography 
                    onClick={() => navigate("/")}
                    className="typoTracker">
                        Crypto Tracker
                     </Typography>
                    <Select 
                    variant="outlined"
                    style={{
                        width: 100,
                        height: 40,
                        marginLeft: 15,
                    }}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header;