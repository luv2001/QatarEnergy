import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

export const useStyles = makeStyles({
    selectFields: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width : '80%',
        // border: '2px solid black',
  },

  fieldWrapper:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  selectFieldds :{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});