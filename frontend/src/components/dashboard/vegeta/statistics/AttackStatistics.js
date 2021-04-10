import React, { useState, useEffect, useContext } from 'react'
import GetVegetaResult from '../../../../apis/vegeta/GetVegetaResult'
import ResponseTimeChart from './ResponseTimeChart'
import RequestsChart from './RequestsChart'
import ThroughputChart from './ThroughputChart'

const AttackStatistics = () => {
    const [attackLatency, setAttackLatency] = useState()
    const [attackThroughput, setAttackThroughput] = useState()
    const [attackRequests, setAttackRequests] = useState()

    const getVegetaAttack = () => {
        let attackLatencyData = []
        let attackThroughputData = []
        let attackRequestsData = []
        let vegetaData = GetVegetaResult();
        vegetaData.then((data) => {
            if (data != undefined)
                data.data.map(item => {
                    attackLatencyData.push(
                        {
                            y: (item.latencies.mean / 1000000).toFixed(2),
                            x: item.latest
                        }
                    )

                    attackThroughputData.push(
                        {
                            y: item.throughput.toFixed(2),
                            x: item.latest
                        }
                    )

                    attackRequestsData.push(
                        {
                            y: item.requests,
                            x: item.latest
                        }
                    )
                })
            setAttackLatency(attackLatencyData)
            setAttackThroughput(attackThroughputData)
            setAttackRequests(attackRequestsData)
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getVegetaAttack()
            // console.log(attackLatency.length)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <RequestsChart attackRequests={attackRequests} />
            <ThroughputChart attackThroughput={attackThroughput} />
            <ResponseTimeChart attackLatency={attackLatency} />
        </>
    )
}

export default AttackStatistics;