import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import TheWheel from "./TheWheel";
import background from "./coolcat.webp";

export default function Banner(){

    return (
        <div style={{ backgroundImage: `url(${background})`}}>
            <Container className="bannerContainer">
                <div className="tagLine">
                    <Typography
                    variant="h2"
                    style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: "Montserrat",
                    }}
                    >
                        TXC Clan Crypto
                    </Typography>
                    <Typography
                    variant="subtitle2"
                    style={{
                        color: "darkgrey",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                    }}
                    >
                        Top 100 Cryptocurrencies And Trending coins.
                    </Typography>
                </div>
                <br />
                <TheWheel/>
            </Container>
        </div>
    )
}