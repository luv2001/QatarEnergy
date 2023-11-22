import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import Field from './Field';
import DateSelection from './DateSelection/DateSelection';

const DisplayService = ({field}) => {


    const [data, setData] = useState(null);

    const [visible, setVisible] = useState(false);

    const [service, setService] = React.useState('');

    const handleChangeService = (event) => {
      setService(event.target.value);
    };

    const [type, setType] = useState("due");

    const handleChangeType = (event) => {
      setType(event.target.value);
    };


    const selectFilterStyles = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width : '50rem'
    };
  


    const handleGetAllData = async () => {
        try {
          const response = await fetch('http://localhost:8000/qatarenergy/get-all-data/');
          if (response.ok) {
            const data = await response.json();
            setData(data);
          } else {
            console.error('Failed to fetch data. Status:', response.status);
          }
        } catch (error) {
          console.error('An error occurred while fetching data:', error);
        }
      };


  return (

    <>
      <Field field ={field} />
        <Button variant="contained" color="primary" onClick={() => {handleGetAllData()}}>
                    Get All Data
                </Button>
                <div style={selectFilterStyles}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Service</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={service}
                        label="Service"
                        onChange={handleChangeService}
                      >
                        <MenuItem value={"SSV/SCSSV"}>SSV/SCSSV</MenuItem>
                        <MenuItem value={"WHCP"}>WHCP</MenuItem>
                        <MenuItem value={"WH-service/X-mas-tree"}>WH-service/X-mas-tree</MenuItem>
                        <MenuItem value={"ESDV"}>ESDV</MenuItem>
                        <MenuItem value={"SSV . Periodic"}>SSV . Periodic</MenuItem>
                        <MenuItem value={"LMV"}>LMV</MenuItem>
                        <MenuItem value={"Remote Function"}>Remote Function</MenuItem>
                        <MenuItem value={"Riser ESDV"}>Riser ESDV</MenuItem>
                        <MenuItem value={"Others(1)"}>Others(1)</MenuItem>
                        <MenuItem value={"Others(2)"}>Others(2)</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleChangeType}
                      >
                        <MenuItem value={"completed"}>completed</MenuItem>
                        <MenuItem value={"due"}>due</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                </div>
               
                {type == 'completed' && <DateSelection />}

                <Button variant="contained" color="primary" onClick={() => {handleGetAllData()}}>
                    Get Data
                </Button>

    </>
  )
}

export default DisplayService