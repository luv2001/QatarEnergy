import { TextField } from '@mui/material';
import React, { useState } from 'react'

const DateSelection = () => {

    //From and to date
    const [fromDate, setFromDate] = useState();

    const handleChangeFromDate = (event) => {
      setFromDate(event.target.value);
    };

    const [toDate, setToDate] = useState();

    const handleChangeToDate = (event) => {
      setToDate(event.target.value);
    };

    const selectFilterStyles = {
        display: 'flex',
        flexDirection: 'row',
        // margin: '10px',
        // border : '3px solid black', // Adjust the margin as needed
        justifyContent: 'space-around',
        width : '50rem'
      };
    

  return (
    <div style={selectFilterStyles}>
    From Date:
    <TextField value={fromDate} onChange={handleChangeFromDate} id="outlined-basic" variant="outlined" type="date" />
    To Date:
    <TextField value={toDate} onChange={handleChangeToDate} id="outlined-basic" variant="outlined" type="date" />
  </div>
  )
}

export default DateSelection