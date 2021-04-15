import './css/plan-list.css'
import { useState, useEffect } from 'react'
import GetPlanByTimeRange from '../../../../apis/vegeta/GetPlanByTimeRange'
import { Button } from "@chakra-ui/react"
import RunPlanByTimeRange from '../../../../apis/vegeta/RunPlanByTimeRange'

const PlanList = (props) => {
    const [requestPlan, setRequestplan] = useState({})
    const { requestHistoryFilter } = props

    useEffect(async () => {
        try {
            // console.log(requestHistoryFilter)
            const { data } = await GetPlanByTimeRange(requestHistoryFilter)
            setRequestplan(data)
            // Object.keys(data).map(key => {
            //     data[key].map(item => {
            //         console.log(key, item)
            //     }
            //     )
            // });

        }
        catch (e) {
        }
    }, [requestHistoryFilter])

    return (
        <>
            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="table-auto min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="w-1/6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider text-center">
                                            Time
                                    </th>
                                        <th class="w-5/6 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider text-center">
                                            Endpoints and Payloads
                                    </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    {
                                        Object.keys(requestPlan).map(timestamp => {
                                            return (
                                                <tr key={timestamp}>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    {timestamp}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <ul class="border border-gray-200 rounded-md divide-y divide-gray-200 text-center">
                                                            {requestPlan[timestamp].map(item => {
                                                                return (
                                                                    <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                                        <div class="w-0 flex-1 flex items-center">
                                                                            <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                                                    ${item['request_method'] == 'GET' ? 'bg-green-100' : item['request_method'] == 'POST' ? 'bg-yellow-100' : item['request_method'] == 'OPTIONS' ? 'bg-gray-100' : item['request_method'] == 'DELETE' ? 'bg-red-100' : ''} 
                                                                                    text-green-800`}>
                                                                                {item['request_method']}
                                                                            </span>
                                                                            <span class="ml-2 flex-1 w-0 truncate">
                                                                                {item['endpoint']}
                                                                            </span>
                                                                        </div>
                                                                        <div class="ml-4 flex-shrink-0">
                                                                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                                                                                Detail
                                                                        </a>
                                                                        </div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </li>
                                                                )
                                                            }
                                                            )}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                colorScheme="blue"
                onClick={() => RunPlanByTimeRange(requestPlan)}
            >
                Run Load Testing Plan 
            </Button>
        </>
    )
}

export default PlanList