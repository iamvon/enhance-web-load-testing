import { Line, Bar } from 'react-chartjs-2'
import GetServerLogs from '../../../apis/server_logs/GetServerLogs'
import { Button } from "@chakra-ui/react"
import { useState } from 'react'

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
                ticks: {
                    min: 0
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
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
        </>

    )


}

export default RequestHistory