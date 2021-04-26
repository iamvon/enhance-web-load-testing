import { Line } from 'react-chartjs-2'

const RequestsChart = (props) => {
    const { attackRequests } = props
    const data = {
        labels: [],
        datasets: [{
            data: attackRequests,
            label: "Load Testing Requests",
            borderColor: "#3e95cd",
            fill: false,
        }]
    }

    const options = {
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'linear',
                scaleLabel: {
                    display: true,
                    labelString: "Timestamp"
                },
            }],
            title: {
                display: false,
            },
            time: {
                unit: 'second',
                unitStepSize: 5
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Requests',
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

export default RequestsChart