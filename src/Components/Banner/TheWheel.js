import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext'

const TheWheel = () => {

    const [trending, setTrending] = useState([])
    const { currency,symbol } = CryptoState();

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
        .then(r => r.json())
        .then(data => setTrending(data))
    }, [currency])

    function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // console.log(trending)

//Loop through and display all trending coins in a carousel
    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link
            className='itemsLink'
            to={`/coins/${coin.id}`}
            >
                <img
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
                />


                <span>

                    {coin.symbol}
                        <span style={{
                            color: profit > 0 ? "#01f704" : "#ff0101",
                            fontWeight: 500,
                        }}>{profit && "+"} {coin.price_change_percentage_24h?.toFixed(2)}</span>
                        <br />
                        <span style={{ fontSize: 22, fontWeight: 500 }}>
                            {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                        </span>

                </span>
            </Link>
        )
    })

    //how many items displayed on the wheel according to devices' pixels
    const responsive ={
        0:  {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

  return (
    <div className="theWheel">
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
    </div>
  )
}

export default TheWheel