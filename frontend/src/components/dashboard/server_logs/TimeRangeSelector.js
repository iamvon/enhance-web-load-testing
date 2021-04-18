import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import './css/date-picker.css';
import { Grid, GridItem, IconButton } from "@chakra-ui/react"
import { TimeIcon } from '@chakra-ui/icons'
import GetLogsByTimeRange from '../../../apis/server_logs/GetLogsByTimeRange'
import format from 'date-fns/format'

const TimeRangeSelector = (props) => {
    const [startTime, setStartTime] = useState(new Date('04/05/2021 18:41:10'));
    const [endTime, setEndTime] = useState(new Date('04/05/2021 18:42:40'));

    const { setRequestHistory, setRequestHistoryFilter } = props

    const getLogsByTimeRange = async () => {
        try {
            let start = format(new Date(startTime), 'MM/dd/yyyy, HH:mm:ss')
            let end = format(new Date(endTime), 'MM/dd/yyyy, HH:mm:ss')
            setRequestHistoryFilter({
                start: start,
                end: end
            })
            const { data } = await GetLogsByTimeRange(start, end)
            
            // console.log(data)
            let requestHistoryData = []
            let requestHistoryDataX = []

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
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Grid
                className="flex-auto -ml-10 mt-3"
                h="100px"
                w="1000px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(10, 1fr)"
                gap={4}
            >
                <GridItem ml={10} rowSpan={1} colSpan={1} >
                    <IconButton
                        colorScheme="blue"
                        aria-label="Time selector"
                        icon={<TimeIcon />}
                        onClick={() => getLogsByTimeRange()}
                    />

                </GridItem>
                <GridItem colSpan={2}>
                    <DatePicker
                        selected={startTime}
                        onChange={time => setStartTime(time)}
                        dateFormat="MM/dd/yyyy HH:mm:ss"
                        placeholderText="Select start time"
                        shouldCloseOnSelect={false}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                    // timeIntervals={1}
                    // timeCaption="time"
                    />
                </GridItem>

                <GridItem colSpan={2}>
                    <DatePicker
                        selected={endTime}
                        onChange={time => setEndTime(time)}
                        dateFormat="MM/dd/yyyy HH:mm:ss"
                        placeholderText="Select end time"
                        shouldCloseOnSelect={false}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                    // timeIntervals={1}
                    // timeCaption="time"
                    />
                </GridItem>
            </Grid>
        </>
    );
}

export default TimeRangeSelector