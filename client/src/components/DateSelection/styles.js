import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

export const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width : '40rem',
        // border: '2px solid black',
        alignItems: 'center'
  }
});