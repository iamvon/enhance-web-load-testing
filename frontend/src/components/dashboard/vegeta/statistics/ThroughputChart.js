import { Line } from 'react-chartjs-2'

const ThroughputChart = (props) => {
    const { attackThroughput } = props
    const data = {
        labels: [],
        datasets: [{
            data: attackThroughput,
            label: "Load Testing Throughput",
            borderColor: "#3e95cd",
            fill: false
        }]
    }

    const options = {
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'linear',
            }],
            title: {
                display: false,
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Throughput (req/s)',
                },
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
                    sensitivity: 3
                }
            }
        }
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <Line
                    data={data}
                    options={options}
                />
            </div>
        </>
    )
}

export default ThroughputChart