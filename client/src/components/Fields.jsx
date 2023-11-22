import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Fields = ({setField}) => {

    const fields = ["MM", "BH", "NFA"];

    const fieldStyles = {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px', // Adjust the margin as needed
        width : '400rem'
    };

    const handleClickButton = (value) => {
        console.log("Field value: " + value);
        setField(value);
    }

  return (<>
        <div>Select Field</div>

        <Box sx={{ '& button': { m: 1 } }}>
        <div style={fieldStyles}>
            {fields.map((field, index) => (
                <Button field={field} key={index} variant="contained" color="primary" component={Link} to={`/service`} onClick={() => {handleClickButton(field)}}>
                    {field}
                </Button>
            ))}
        </div>
        </Box>
    </>
  )
}

export default Fields