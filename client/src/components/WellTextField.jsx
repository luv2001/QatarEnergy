import { TextField, Typography } from '@mui/material'
import React from 'react'

const WellTextField = ({key, value, wellValue, handleChangeWell}) => {
  return (
    <>
    <Typography>{key}</Typography>
    <TextField value={value} onChange={(e) => handleChangeWell(e.target.value)} id="outlined-basic" label="well" variant="outlined" type="number" />
    </>
  )
}

export default WellTextField