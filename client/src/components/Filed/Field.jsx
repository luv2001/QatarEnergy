import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'

import { useStyles } from './styles';

const Field = ({field, setField}) => {

  const classes = useStyles();

  const handleChangeService = (event) => {
    console.log("value: " , event.target.value);
    setField(event.target.value);
  }

  return (
    <div className={classes.root}>
          <Typography variant="h3">Field :</Typography>

          <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Field</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={field}
                        label="Field"
                        onChange={(event) => handleChangeService(event)}
                      >
                        <MenuItem value={"MM"}>MM</MenuItem>
                        <MenuItem value={"BH"}>BH</MenuItem>
                        <MenuItem value={"NFA"}>NFA</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

    </div>
  )
}

export default Field