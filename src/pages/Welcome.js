import React from 'react'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserCredentials } from '../App'
import Todos from '../components/Todos'
import {
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider
} from '@mui/material'

//welcome component
export default function Welcome(){
    //get credentials from context
    const { credentials, setCredentials } = useContext(UserCredentials)
  //get authToken from context
    const { authToken, setAuthToken } = useContext(UserCredentials)

    const handleLogOut = () => {
      setCredentials({
        username: '',
        password: ''
      })
      setAuthToken('')
    }

    //condtionnaly check if credentials contains anything, if so renders it
    //if the authToken context is truthy then the Todos component is rendered, and the authToken is passed as props 
    //reginser and login buttons to go to those forms
    return (
        <Container>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            
          }}
          >
            {credentials.username ? ( // Check if username exists in credentials
              <Box sx={{
                display: 'flex',
                padding: 2,
                justifyContent: 'flex-end'
                }}>
                <Typography variant="h5">
                  Welcome {credentials.username.replace('@gmail.com', ' ')}
                </Typography>
                
                <Button onClick={handleLogOut}>Log out</Button>
              </Box>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography variant="h1">Welcome</Typography>
                <Paper sx={{
                  padding: '20px', 
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'space-evenly'
                }}
                  >
                  
                  <Link to="/register">
                  <Button>
                    Register
                  </Button>
                  </Link>
                  
                  <Link to="/login">
                  <Button>
                    Log in
                  </Button>
                  </Link>
                  
                </Paper>
              </Box>
            )}
            {authToken && <Todos authToken={authToken}/>}
          </Box>
        </Container>
    )
}