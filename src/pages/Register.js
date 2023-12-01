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
//Register page
export default function Register() {
    //piece of state for remembering username
    const [ username, setUsername] = useState("")
    //piece of state for remembering password
    const [ password, setPassword] = useState("")
    //piece of state for remembering resposne message
    const [ responseMsg, setResponseMsg ] = useState("")
    //state for remembering any errors
    const [ error, setError ] = useState(false)
    
    const navigate = useNavigate();
    //register function 
    const register = async (e) => {
        //prevent page from reloading
        e.preventDefault();

        try{
            //make request to api endpoint
            const response = await fetch(`/users/register`,{
                //post request
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //username and password for body of request
                body: JSON.stringify({
                    username,
                    password,
                }),
                
            });
            //if response is not okay
            if(!response.ok) {
                console.log("network response was not ok(200)")
            }
            if(response.status === 403) {
                setError({error: "Username must end with @gmail.com"})
            } else {
            //await response from api call and place in variable 
            const data = await response.json()
            console.log(data)
            //set response message piece of state to data from request
            setResponseMsg(data)
                //if response status is 200
                if(response.status === 200) {
                    //set response message to data from request
                    setResponseMsg(data)
                    //navigate back to welcome page after 2 seconds
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                }
            }
                //handle potential errors 
        } catch (error) {
            console.log(error)
            setError(error)
        }
    };
    //form with inputs onChange set to set the current value to respective piece of state
    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh'
          }}
        >
            <Typography variant='h4'>Register</Typography>
            {responseMsg && <span>{responseMsg.message}</span>}
            <Box
            component="form"
            sx={{my: 5}}
            >
                <Paper sx={{
                    padding: '20px'
                }}>
                    {error && <Typography variant="body1" sx={{my: 2}}>{error.error}</Typography>}
                    <TextField 
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username@gmail.com" 
                    />
                    <br />
                    <TextField
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        sx={{my: 5}} 
                    />
                    <br />
                    <Button onClick={register}>Register</Button>
                </Paper>
            </Box>
        </Container>
    )
}