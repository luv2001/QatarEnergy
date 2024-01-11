// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// import { useStyles } from './styles';

// function createData(name, calories) {
//   return { name, calories};
// }

// const rows = [
//   createData('Frozen yoghurt', 159),
//   createData('Ice cream sandwich', 237),
//   createData('Eclair', 262),
//   createData('Cupcake', 305),
//   createData('Gingerbread', 356),
// ];

// const DisplayServiceTable = ({dueWells, service}) => {


//     const classes = useStyles();



//     if(service == null){
//         return <>Please select a service</>
//     }

//     if (dueWells === null || Object.keys(dueWells).length === 0) {
//       return <>No due wells available</>;
//     }

//     // return (
//     //   <table>
//     //     <thead>
//     //       <tr>
//     //         <th>Well ID</th>
//     //         <th>Due</th>
//     //       </tr>
//     //     </thead>
//     //     <tbody>
//     //       {Object.entries(dueWells).map(([wellId, due]) => (
//     //         <tr key={wellId}>
//     //           <td>{wellId}</td>
//     //           <td>{due}</td>
//     //         </tr>
//     //       ))}
//     //     </tbody>
//     //   </table>
//     // );


//   return (
//         <TableContainer >
//         <Table sx={{ width: '40%' }} aria-label="simple table" align="center">
//         <TableHead sx={{ 'th, td': { border: 2 } }}>
//             <TableRow>
//             <TableCell align="center">Well No</TableCell>
//             <TableCell align="center">No of days</TableCell>
//             </TableRow>
//         </TableHead>
//         <TableBody>
//             {rows.map((row) => (
//             <TableRow
//                 key={row.name}
//                 sx={{ 'th, td': { border: 2 } }}
//             >
//                 <TableCell align="center" component="th" scope="row">
//                 {row.name}
//                 </TableCell>
//                 <TableCell align="center">{row.calories}</TableCell>
//             </TableRow>
//             ))}
//         </TableBody>
//         </Table>
//     </TableContainer>
//   )
// }

// export default DisplayServiceTable

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useStyles } from './styles';

const DisplayServiceTable = ({ dueWells, service ,field }) => {
  const classes = useStyles();

  if (field == null) {
    return <>Please select a Field</>;
  }

  if (service == null) {
    return <>Please select a service</>;
  }

  if (dueWells === null || Object.keys(dueWells).length === 0) {
    return <>No due wells available</>;
  }

  return (
    <TableContainer className={classes.tableContainer}>
      <Table  sx={{ width: '40%'}} aria-label="simple table" align="center">
        <TableHead>
          <TableRow>
            <TableCell align="center">Well No</TableCell>
            <TableCell align="center">No of days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(dueWells).map(([wellId, days]) => (
            <TableRow key={wellId}>
              <TableCell align="center">{wellId}</TableCell>
              <TableCell align="center">{days}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayServiceTable;
