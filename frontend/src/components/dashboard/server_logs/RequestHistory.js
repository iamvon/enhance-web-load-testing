import { Line, Bar } from 'react-chartjs-2'
import GetServerLogs from '../../../apis/server_logs/GetServerLogs'
import { Button } from "@chakra-ui/react"
import { useState } from 'react'
import TimeRangeSelector from './TimeRangeSelector'

const RequestHistory = () => {
    const [requestHistory, setRequestHistory] = useState([])

    const getRequestHistory = async () => {
        let requestHistoryData = []
        let requestHistoryDataX = []

        try {
            const data = await GetServerLogs()
            if (data != undefined)
                // console.log(data.data)
                Object.keys(data.data.index).map(key => {
                    requestHistoryDataX.push(
                        {
                            x: data.data.timestamp[key],
                        }
                    )
                });

            let counts = {}
            requestHistoryDataX.forEach(item => {
                counts[item['x']] = (counts[item['x']] || 0) + 1
            });

            Object.keys(counts).map(key => {
                requestHistoryData.push(
                    {
                        x: key,
                        y: counts[key],
                    }
                )
            })
            setRequestHistory(requestHistoryData)
            // console.log(requestHistory)
        }
        catch (e) {
            console.log(e)
        }
    }

    const data = {
        labels: [],
        datasets: [{
            label: "Requests",
            data: requestHistory,
            backgroundColor: "blue",
            borderWidth: 1,
        }]
    }

    let options = {
        scales: {
            xAxes: [{
                type: "time",
                offset: true,
                // ticks: {
                //     min: 0
                // },
                barThickness: 3,
                autoSkip: false,
                time: {
                    unit: 'second',
                    unitStepSize: 2
                },
                scaleLabel: {
                    display: true
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            legend: {
                position: 'top',
            },
            zoom: {
                pan: {
                    enabled: true,
                    speed: 2,
                    mode: 'x'
                },
                zoom: {
                    enabled: true,
                    mode: 'x',
                    sensitivity: 3,
                    // drag: true,
                },
            }
        }
    }
    return (
        <>
            <Bar
                data={data}
                options={options}
            />
            <Button
                colorScheme="blue"
                onClick={() => getRequestHistory()}
            >
                Get Request History
            </Button>
            <TimeRangeSelector />
        </>

    )


}

export default RequestHistory