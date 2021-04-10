import { Line } from 'react-chartjs-2'

const RequestsChart = (props) => {
    const { attackRequests } = props
    const data = {
        labels: [],
        datasets: [{
            data: attackRequests,
            label: "Load Testing Requests",
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
                    labelString: 'Number of Requests',
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

export default RequestsChart