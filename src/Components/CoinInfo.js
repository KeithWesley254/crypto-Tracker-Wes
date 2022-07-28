import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { chartDays } from '../ChartDays';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import SelectBtn from './SelectBtn';

ChartJS.register(...registerables);

function CoinInfo({ coin }) {
    const [historicalData, setHistoricalData] = useState()
    const [days, setDays] = useState(1);

    const{ currency, symbol } = CryptoState()

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`)
        .then(r => r.json())
        .then(data => setHistoricalData(data.prices))
    }, [days])

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

  return (
    <ThemeProvider theme={darkTheme}>
        <div className="chartContainer">
            {
                !historicalData ? (
                    <CircularProgress style={{color: "gold"}} size={250} thickness={1}/>
                ) : (
                    <>
                    <Line 
                    data = {{
                        labels: historicalData.map(coin => {
                            let date = new Date(coin[0]);
                            let time = date.getHours() > 12
                            //eg 1900hrs = 19 - 12 = 7 then 7 : 20 PM
                            ? `${date.getHours() - 12} : ${ date.getMinutes()} PM`
                            : `${date.getHours()} : ${date.getMinutes()}} AM`;
                        
                        //set time or date on chart depending if it is 24hrs or otherwise eg 30days
                        return days === 1 ? time : date.toLocaleDateString()
                        }),

                            datasets: [{
                            data: historicalData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${currency}`,
                            borderColor: "#EEBC1D",
                        }]
                    }}
                    options={{
                        elements: {
                            point: {
                                radius: 1,
                            },
                        },
                    }}
                    />
                    <div style={{
                        display: "flex",
                        marginTop: 20,
                        justifyContent: "space-around",
                        width: "100%",
                    }}>
                        {chartDays.map(day => (
                            <SelectBtn 
                            key={day.value}
                            onClick={() => setDays(day.value)}
                            selected={day.value === days}
                            >
                                {day.label}
                            </SelectBtn>
                        ))}
                    </div>
                    </>
                )
            }
        </div>
    </ThemeProvider>
  )
}

export default CoinInfo