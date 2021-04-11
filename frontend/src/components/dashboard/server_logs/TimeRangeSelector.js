import React, { useState } from "react"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import './css/date-picker.css';

const TimeRangeSelector = () => {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <DatePicker
            selected={startDate}
            onChange={
                date => setStartDate(date)
            } />
    )
}

export default TimeRangeSelector