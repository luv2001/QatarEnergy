import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

import {useStyles} from "./styles"

const DateSelection = ({fromDate, toDate, handleChangeFromDate, handleChangeToDate}) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>From Date:</Typography>
      <TextField value={fromDate} onChange={handleChangeFromDate} id="outlined-basic" variant="outlined" type="date" />
      <Typography>To Date:</Typography>
      <TextField value={toDate} onChange={handleChangeToDate} id="outlined-basic" variant="outlined" type="date" />
    </div>
  )
}

export default DateSelection