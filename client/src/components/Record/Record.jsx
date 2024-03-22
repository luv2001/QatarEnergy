import React from 'react';
import RecordService from '../RecordService';
import Field from '../Filed/Field';

import { useStyles } from './styles';

const Record = ({field, setField}) => {

  const classes = useStyles();

  const services = [
    "SSV/SCSSV",
    "WHCP",
    "WH-service/X-mas-tree",
    "ESDV",
    "SSV . Periodic",
    "LMV",
    "Remote Function",
    "Riser ESDV",
    "Others(1)",
    "Others(2)"
  ];

  const recordServiceStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px', // Adjust the margin as needed
  };
  
  return (

    <>
      <div className={classes.fieldWrapper}> <Field field={field} setField={setField}/> </div>

     { field ? <div style={recordServiceStyle}>
        {services.map((service, index) => (
          <RecordService key={index} service={service} field={field}/>
        ))}
      </div> : <>Please select a field</>}

    </>
  );
};

export default Record;
