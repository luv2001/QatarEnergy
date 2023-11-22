import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import wellList from "../static/Constants.js"

const RecordService = ({ serviceName }) => {
  
  const [wellValue, setWellValue] = useState('');
  const [wellDate, setWellDate] = useState('');

  const handleChangeWell = (_, newValue) => {
    setWellValue(newValue);
  };

  const handleChangeDate = (event) => {
    setWellDate(event.target.value);
  };

  const handleSave = () => {
    // Your save logic here
    console.log("Well value:", wellValue);
    console.log("Date value:", wellDate);
  };

  const recordServiceStyle = {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px', // Adjust the margin as needed
    justifyContent: 'space-around',
  };

  return (
    <div style={recordServiceStyle}>
      <Typography width={200}>{serviceName}</Typography>

      <div>
        <Autocomplete
          disablePortal
          id="well-combo-box"
          key={wellList}
          options={wellList}
          value={wellValue}
          onChange={handleChangeWell}
          renderInput={(params) => <TextField {...params} label="Well" />}
        />
        <TextField
          value={wellDate}
          onChange={handleChangeDate}
          id="outlined-basic"
          label="Date"
          variant="outlined"
          placeholder=""
          type="date"
          style={{ width: "15rem" }}
        />

        <Button variant="contained" size="large" onClick={handleSave}> Save </Button>
      </div>
    </div>
  );
};

export default RecordService;
