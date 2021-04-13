import { Line, Bar } from 'react-chartjs-2'
import GetServerLogs from '../../../apis/server_logs/GetServerLogs'
import { Button } from "@chakra-ui/react"
import { useState } from 'react'
import TimeRangeSelector from './TimeRangeSelector'
import PlanList from '../server_logs/custom_load_testing_plan/PlanList'

const RequestHistory = () => {
    const [requestHistory, setRequestHistory] = useState([])
    const [requestHistoryFilter, setRequestHistoryFilter] = useState({
        start: null,
        end: null
    })

    const getRequestHistory = async () => {
        let requestHistoryData = []
        let requestHistoryDataX = []

        try {
            const { data } = await GetServerLogs()
            data.map(item => {
                requestHistoryDataX.push(
                    {
                        x: item['timestamp'],
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
            <br />
            <br />
            <TimeRangeSelector
                setRequestHistory={setRequestHistory}
                setRequestHistoryFilter={setRequestHistoryFilter}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
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
            <br />
            <br />
            <PlanList
                requestHistoryFilter={requestHistoryFilter}
            />
        </>

    )


}

export default RequestHistory