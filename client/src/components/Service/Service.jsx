import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Field from '../Filed/Field'

import { useStyles } from './styles'

const Service = ({field, setField}) => {
  const classes = useStyles();

  return (
    <>
       <div className={classes.fieldWrapper}> <Field field={field} setField={setField}/> </div>
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