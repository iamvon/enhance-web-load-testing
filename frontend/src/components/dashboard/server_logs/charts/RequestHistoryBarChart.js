import { Bar } from 'react-chartjs-2'
import { Button } from "@chakra-ui/react"
import TimeRangeSelector from '../TimeRangeSelector'

const RequestHistoryBarChart = (props) => {
    const { requestHistory, getRequestHistory, setRequestHistory, setRequestHistoryFilter } = props

    const data = {
        labels: [],
        datasets: [{
            label: "Requests",
            data: requestHistory,
            backgroundColor: "blue",
            // borderWidth: 1,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            barThickness: 8,
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
                barThickness: 8,
                autoSkip: false,
                time: {
                    unit: 'second',
                    unitStepSize: 5
                },
                scaleLabel: {
                    display: true
                },
                // display: false,
                scaleLabel: {
                    display: true,
                    labelString: "Timestamp"
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(33, 37, 41, 0.3)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2]
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: "Value"
                },
                gridLines: {
                    borderDash: [2],
                    drawBorder: false,
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.2)",
                    zeroLineColor: "rgba(33, 37, 41, 0.15)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2]
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
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
            <div className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-grow flex-1">
                                <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                                    Server Log
                                </h6>
                                <h2 className="text-blueGray-700 text-xl font-semibold">
                                    Request History
                                </h2>

                            </div>
                            <Button
                                colorScheme="blue"
                                onClick={() => getRequestHistory()}
                            >
                                Get Request History
                            </Button>
                        </div>
                        <TimeRangeSelector
                            setRequestHistory={setRequestHistory}
                            setRequestHistoryFilter={setRequestHistoryFilter}
                        />
                    </div>
                    <div className="p-4 flex-auto -mt-20">
                        {/* Chart */}
                        {/* <div className="relative" style={{ height: "350px" }}> */}
                        <Bar
                            className="relative" style={{ height: "500px" }}
                            data={data}
                            options={options}
                        />
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestHistoryBarChart