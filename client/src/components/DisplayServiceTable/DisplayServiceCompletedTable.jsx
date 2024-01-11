import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

const DisplayServiceCompletedTable = ({ fromDate, toDate, completedWells, service , field}) => {

    if (field == null) {
      return <>Please select a Field</>;
    }

    if(service === null){
        return <>Please select a service</>
    }

    if (fromDate == null && toDate == null) {
      return <div>Please select from and to date</div>;
    }
  
    if (fromDate == null) {
      return <div>Please select 'from date' </div>;
    }
  
    if (toDate == null) {
      return <div>Please select 'to date' </div>;
    }
  
    if (fromDate > toDate) {
      return <div> From date should be less than to date </div>;
    }
  
    if (!completedWells || completedWells.length === 0) {
      return <>No completed wells available</>;
    }
  
    return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Well No</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedWells.map((data, index) => (
              <TableRow key={index}>
                <TableCell align="center">{data.well}</TableCell>
                <TableCell align="center">{data.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  

export default DisplayServiceCompletedTable