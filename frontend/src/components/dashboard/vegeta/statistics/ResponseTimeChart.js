import { Line, Bar } from 'react-chartjs-2'

const ResponseTimeChart = (props) => {
    const { attackLatency } = props
    const data = {
        labels: [],
        datasets: [{
            data: attackLatency,
            label: "Load Testing Response Time",
            fill: false,
            barThickness: 8,
            borderColor: "#58d1c3",
            backgroundColor: "#4cc8e1",
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
                    display: true,
                    labelString: "Milliseconds (ms)"
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

    // const options = {
    //     scales: {
    //         xAxes: [{
    //             type: 'time',
    //             distribution: 'linear',
    //             scaleLabel: {
    //                 display: true,
    //                 labelString: "Timestamp"
    //             },
    //         }],
    //         title: {
    //             display: false,
    //         },
    //         time: {
    //             unit: 'second',
    //             unitStepSize: 5
    //         },
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero: true
    //             },
    //             scaleLabel: {
    //                 display: true,
    //                 labelString: 'Mean Response Time (ms)',
    //             },
    //         }]
    //     },
    //     plugins: {
    //         legend: {
    //             position: 'top',
    //         },
    //         zoom: {
    //             pan: {
    //                 enabled: true,
    //                 speed: 2,
    //                 mode: 'x'
    //             },
    //             zoom: {
    //                 enabled: true,
    //                 mode: 'x',
    //                 sensitivity: 3
    //             }
    //         }
    //     }
    // }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <Bar
                    data={data}
                    options={options}
                />
            </div>
        </>
    )
}

export default ResponseTimeChart