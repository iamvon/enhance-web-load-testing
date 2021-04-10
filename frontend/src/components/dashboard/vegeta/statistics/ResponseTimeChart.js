import { Line } from 'react-chartjs-2'

const ResponseTimeChart = (props) => {
    const { attackLatency } = props
    const data = {
        labels: [],
        datasets: [{
            data: attackLatency,
            label: "Load Testing Response Time",
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
                    labelString: 'Mean Response Time (ms)',
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

export default ResponseTimeChart