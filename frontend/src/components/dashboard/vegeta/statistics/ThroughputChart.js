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
        }
    }

    return (
        <Line
            data={data}
            options={options}
        />
    )
}

export default ThroughputChart