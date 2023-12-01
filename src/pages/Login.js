import React, { useState, useContext} from "react";
import { UserCredentials } from "../App"
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    Paper,
    Stack,
    TextField,
    Button
  } from '@mui/material'

//login page
export default function Login() {
    //username and password pieces of state
    const [ username, setUsername] = useState("")
    const [ password, setPassword] = useState("")
   //error piece of state
    const [ error, setError ] = useState(false)
    //handle login and saveAuth functions from context
    const { handleLogin, handleSaveAuth } = useContext(UserCredentials)
    //nagivate hook to go back to welcome page 
    const navigate = useNavigate()
    //login function
    const login = async (e) => {
        //prevent reloading page 
        e.preventDefault();
        try{
            //make api request
            const response = await fetch(`/users/login`,{
                //post request
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //username and password as body of request
                body: JSON.stringify({
                    username,
                    password,
                }),
                
            });
            //if the response status is not okay
            if(!response.ok) {
                console.log("network response was not ok(200)")    
            }
            //await response.text because response should be a token if all goes well
            const data = await response.text()
            
            //if response status is 200
            if(response.status === 200){

                console.log(data)
                //call save auth function and pass response as argument
                handleSaveAuth(data)
                //call handle login function and pass username and password as argument
                handleLogin({
                    username,
                    password
                })
                //use navigate hook to go back to welcome page
                navigate('/')
            }

            //if response status is 401, set Error piece of state to true
            if(response.status === 401) {
                setError(true)
            }
            
            //handle potential errors
        } catch (error) {
            console.log(error)
            
        }
    };
    //return a form with input values being tracked and set by pieces of state
    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh'
        }}>
            <Typography variant='h4'>Login</Typography>
            {error && <span>Username or password do not match</span>}
            <Box 
            component="form"
            sx={{my: 5}}
            >   
                <Paper sx={{
                    padding: '20px'
                }}
                >
                    <TextField 
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username" 
                    />
                    <br />
                    <TextField
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        sx={{my: 5}}  
                    />
                    <br />
                    <Button onClick={login}>Login</Button>
                </Paper>
            </Box>
        </Container>
    )
}