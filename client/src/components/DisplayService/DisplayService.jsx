import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import Field from '../Filed/Field';
import DateSelection from '../DateSelection/DateSelection';
import DisplayServiceTable from '../DisplayServiceTable/DisplayServiceTable';
import { useEffect } from 'react';
import DisplayServiceCompletedTable from '../DisplayServiceTable/DisplayServiceCompletedTable';

import { URL } from '../../Constants/UrlConstants';

import { useStyles } from './styles';

const DisplayService = ({field, setField}) => {
    const classes = useStyles();

    const [data, setData] = useState(null);

    const [visible, setVisible] = useState(false);

    const [service, setService] = React.useState(null);

    const [fromDate, setFromDate] = useState(null);

    const [dueWells, setDueWells] = useState(null);

    const[completedWells, setCompletedWells] = useState(null);


    const handleChangeFromDate = (event) => {
      setFromDate(event.target.value);
    };

    const [toDate, setToDate] = useState(null);

    const handleChangeToDate = (event) => {
      setToDate(event.target.value);
    };

    const handleChangeService = (event) => {
      setService(event.target.value);
    };

    const [type, setType] = useState("due");

    const handleChangeType = (event) => {
      setType(event.target.value);
    };

    useEffect(() => {
        if(service && type === "due") {
          handleGetDueWells();
        }
    }, [visible, service, field])

    useEffect(() => {
      if(service && type === "completed" && fromDate !== null && toDate !== null) {
        handleGetCompletedWells();
      }
  }, [visible, service, field, fromDate, toDate])

   
    const handleGetDueWells = async () => {
        try {
          const response = await fetch(URL + 'qatarenergy/get-due-wells/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              service: service,
              field: field
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setDueWells(data["due_wells"]); // Set the state with the due_wells array from the API response
            
          } else {
            console.error('Failed to fetch data. Status:', response.status);
          }
        } catch (error) {
          console.error('An error occurred while fetching data:', error);
        }
      };

      const handleGetCompletedWells = async () => {
        try {
          const response = await fetch(URL + "qatarenergy/get-completed-data/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              service: service,
              field: field,
              from_date: fromDate,
              to_date: toDate
            }),
          });

          if (response.ok) {
            const data = await response.json();

            setCompletedWells(data["completed_wells"])
            
          } else {
            console.error('Failed to fetch data. Status:', response.status);
          }
        } catch (error) {
          console.error('An error occurred while fetching data:', error);
        }
      };


      
 

    const handleDownloadPdf = () => {};


  return (

    <>
    <div className={classes.fieldWrapper}>
      <Field field={field}  setField={setField}/>
    </div>

      <div className={classes.selectFieldds}>
                <div className={classes.selectFields}>
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

                  {type == 'completed' && <DateSelection fromDate={fromDate} toDate={toDate} handleChangeFromDate = {handleChangeFromDate} handleChangeToDate={handleChangeToDate} /> }


                </div>
               

                {type == 'completed' ?  <DisplayServiceCompletedTable service={service} fromDate={fromDate} toDate={toDate} field={field}   completedWells={completedWells} /> : <DisplayServiceTable dueWells={dueWells} service={service} field={field}/>}

                {/* {(service !== null) && (
                  <Button variant="contained" color="primary" onClick={() => {handleDownloadPdf()}}>
                    Download PDF
                  </Button>
                )} */}


                </div>
          

    </>
  )
}

export default DisplayService