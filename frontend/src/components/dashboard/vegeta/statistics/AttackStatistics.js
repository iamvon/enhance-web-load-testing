import React, { useState, useEffect, useContext } from 'react'
import GetVegetaResult from '../../../../apis/vegeta/GetVegetaResult'
import ResponseTimeChart from './ResponseTimeChart'
import RequestsChart from './RequestsChart'
import ThroughputChart from './ThroughputChart'

const AttackStatistics = (props) => {
    const [attackLatency, setAttackLatency] = useState()
    const [attackThroughput, setAttackThroughput] = useState()
    const [attackRequests, setAttackRequests] = useState()

    const { requestPlanIdx, clearChart, setClearChart, resultFolder } = props

    const getVegetaAttack = async () => {
        let attackLatencyData = []
        let attackThroughputData = []
        let attackRequestsData = []
        try {
            let postData = {
                request_idx: requestPlanIdx,
                result_folder: resultFolder
            }
            let { data } = await GetVegetaResult(postData);
            data.map(item => {
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
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getVegetaAttack()
        }, 1000);
        return () => clearInterval(interval);
    }, [requestPlanIdx, resultFolder]);

    useEffect(() => {
        if (clearChart) {
            setAttackLatency([])
            setAttackThroughput([])
            setAttackRequests([])
            setClearChart(false)
        }
    }, [clearChart])

    return (
        <>
            {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1"> */}
            <div className="w-full xl:w-1/3 mb-12 xl:mb-0 px-4 mb-20">
                <RequestsChart attackRequests={attackRequests} />
            </div>
            <div className="w-full xl:w-1/3 mb-12 xl:mb-0 px-4">
                <ThroughputChart attackThroughput={attackThroughput} />
            </div>
            <div className="w-full xl:w-1/3 mb-12 xl:mb-0 px-4">
                <ResponseTimeChart attackLatency={attackLatency} />
            </div>
            {/* </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default AttackStatistics;