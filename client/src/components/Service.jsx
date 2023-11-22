import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Field from './Field'

const Service = ({field}) => {

  console.log("Field value in service: " + field)
  return (
    <>
       <Field field={field}/>
        <Box sx={{ '& button': { m: 1 } }}>
        <div>
            <Link to='/record'>
                <Button variant="contained" size="large">
                Record Service
                </Button>
            </Link>

            <Link to='/displayservice'>
                <Button variant="contained" size="large">
                Display Service
                </Button>
            </Link>
         
        </div>
        </Box>
    </>
  )
}

export default Service