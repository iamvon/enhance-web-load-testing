import GetServerLogs from '../../../apis/server_logs/GetServerLogs'
import { useState } from 'react'
import PlanList from '../server_logs/custom_load_testing_plan/PlanList'
import RequestHistoryBarChart from './charts/RequestHistoryBarChart'
import AttackStatistics from '../vegeta/statistics/AttackStatistics'

const RequestHistory = () => {
    const [requestHistory, setRequestHistory] = useState([])
    const [requestHistoryFilter, setRequestHistoryFilter] = useState({
        start: null,
        end: null
    })
    const [requestPlanIdx, setRequestPlanIdx] = useState([])
    const [clearChart, setClearChart] = useState(false)
    const [resultFolder, setResultFolder] = useState(null)

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

    return (
        <>
            <div className="relative bg-pink-700 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">

                </div>
            </div>
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
                <div className="flex flex-wrap">
                    <RequestHistoryBarChart
                        requestHistory={requestHistory}
                        setRequestHistory={setRequestHistory}
                        getRequestHistory={getRequestHistory}
                        setRequestHistoryFilter={setRequestHistoryFilter}
                    />
                    <PlanList
                        requestHistoryFilter={requestHistoryFilter}
                        setResultFolder={setResultFolder}
                        setRequestPlanIdx={setRequestPlanIdx}
                    />
                </div>
                <div className="flex flex-wrap mt-4">
                    <AttackStatistics
                        requestPlanIdx={requestPlanIdx}
                        clearChart={clearChart}
                        setClearChart={setClearChart}
                        resultFolder={resultFolder}
                        setClearChart={setClearChart}
                        setResultFolder={setResultFolder}
                        requestHistoryFilter={requestHistoryFilter}
                    />
                </div>
            </div>
        </>
    )
}

export default RequestHistory