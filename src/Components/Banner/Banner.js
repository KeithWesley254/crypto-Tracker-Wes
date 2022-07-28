import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import TheWheel from "./TheWheel";

export default function Banner(){

    return (
        <div className="bannerImg">
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
                        Crypto Tracker
                    </Typography>
                    <Typography
                    variant="subtitle2"
                    style={{
                        color: "darkgrey",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                    }}
                    >
                        Everything Crypto-currency
                    </Typography>
                </div>
                <TheWheel/>
            </Container>
        </div>
    )
}