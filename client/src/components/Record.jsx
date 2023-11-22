import React from 'react';
import RecordService from './RecordService';
import Field from './Field';

const Record = ({field}) => {
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

    <Field field={field}/>
    
      <div style={recordServiceStyle}>
        {services.map((service, index) => (
          <RecordService key={index} serviceName={service} field={field}/>
        ))}
      </div>

    </>
  );
};

export default Record;
