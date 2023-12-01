import React from 'react'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ED7D31'
        },
        background: {
            default: '#4F4A45',
            paper: '#6C5F5B'
        }
    },
    typography: {
        fontFamily: 'Comfortaa',
    },
    
})

export default theme;