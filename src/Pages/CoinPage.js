import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../Components/CoinInfo";
import { Typography, LinearProgress } from "@mui/material";
import ReactHtmlParser from "html-react-parser"

export default function CoinPage(){

    const { id } = useParams();
    const [coin, setCoin] = useState();

    const { currency, symbol } = CryptoState();

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(r => r.json())
        .then(data => setCoin(data))
    }, [])

    function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //ensures we dont get an error before the coin state is updated by the usEffect
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    //&nbsp; for spacing in Mui
    return (
        <div className="coinContainer">
            <div className="sideBar">
                <img 
                src={coin.image.large}
                alt={coin.name}
                height="200"
                style={{ marginBottom: 20 }}
                />
                <Typography variant="h3" className="coinHeader">
                    {coin.name}
                </Typography>
                &nbsp;
                <Typography className="coinDescription">
                    {ReactHtmlParser(coin.description.en.split(". ")[0])}
                </Typography>
                &nbsp;
                <div className="marketData">
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className="coinHeader">
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                            {coin.market_cap_rank}
                        </Typography>
                    </span>
                    <br />
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className="coinHeader">
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>
                    <br />
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className="coinHeader">
                            Market Cap:{" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                           {symbol}{" "}
                           {numberWithCommas(
                            coin.market_data.market_cap[currency.toLowerCase()]
                            .toString()
                            .slice(0, -6))}
                            &nbsp;
                           Million
                        </Typography>
                    </span>
                    <br />
                </div>
            </div>

            <CoinInfo coin={coin}/>
        </div>
    )
}