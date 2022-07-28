import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext'

const TheWheel = () => {

    const [trending, setTrending] = useState([])
    const { currency } = CryptoState();

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
        .then(r => r.json())
        .then(data => setTrending(data))
    }, [currency])

    console.log(trending)

//Loop through and display all trending coins in a carousel
    const items = trending.map((coin) => {
        return (
            <Link
            className=''
            to={`/coins/${coin.id}`}
            >
                <img
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
                />
            </Link>
        )
    })

    const responsive ={
        0:  {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

  return (
    <div className='theWheel'>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
    </div>
  )
}

export default TheWheel