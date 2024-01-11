import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";


import {wellList} from "../static/Constants.js"
import { DateTimePicker } from '@mui/x-date-pickers';

import {URL, yesterdayFormatted} from "../Constants/UrlConstants.js"

const RecordService = ({ service, field }) => {

  const [wellValue, setWellValue] = useState('');
  const [wellDate, setWellDate] = useState(yesterdayFormatted);


  const navigate = useNavigate(); 
  useEffect(() => {
    if (!field || field.trim() === '') {
      navigate('/')
    }
  }, [field, navigate]);



  const handleChangeWell = (_, newValue) => {
    setWellValue(newValue.label);
  };

  const handleChangeDate = (event) => {
    setWellDate(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(URL + "qatarenergy/insert-data/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          well: wellValue,
          date_done: wellDate,
          service: service,
          field: field,
          "jacket": "Jacket 1",
          "supervisor": "Supervisor 1",
          "comments": "Comments 1"
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data inserted successfully:', data);
      } else {
        console.error('Failed to insert data. Status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while inserting data:', error);
    }
  
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
      <Typography width={200}>{service}</Typography>

      <div style = {{display : "flex", flexDirection : "row", justifyContent : "space-around", border : "0px solid black", width : "30rem"}}>
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
          type="date"
          style={{ width: "15rem" }}
        />


        <Button variant="contained" size="large" onClick={handleSave}> Save </Button>
      </div>
    </div>
  );
};

export default RecordService;
