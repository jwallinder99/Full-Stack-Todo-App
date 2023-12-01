import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { createContext, useState } from 'react'
//create context
export const UserCredentials = createContext();


function App() {
  //state for remembering user credentials 
  const [credentials, setCredentials ] = useState({});
  //state for remembering auth token
  const [ authToken, setAuthToken] = useState("")
  
  //function to handle logging in
  const handleLogin = (newCredentials) => {
    //sets credentials to a new copy of current credentials and the new credentials passed as parameters
    setCredentials({...credentials, ...newCredentials})
  }
  //function to save token
  const handleSaveAuth = (token) => {
    setAuthToken(token)
    
  }
  //provider component for context 
  //router and route component for routes, and components as elements for routes
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <UserCredentials.Provider value={{credentials, setCredentials, authToken, setAuthToken, handleLogin, handleSaveAuth}}>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Router>
        </UserCredentials.Provider>  
      </div>
    </ThemeProvider>  
  );
}

export default App;
