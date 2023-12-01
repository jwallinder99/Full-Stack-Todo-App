import React, { useEffect, useState, useContext } from 'react'
import { UserCredentials } from '../App'
import {
    Container,
    Box,
    Typography,
    Paper,
    Stack,
    TextField,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    ListItemText,
    IconButton
  } from '@mui/material'
import TodoItem from './TodoItem'
import EditIcon from '@mui/icons-material/Edit';

//todos component
export default function Todos (props) {

    //piece of state for todos 
    const [ todos, setTodos ] = useState([])
    //piece of state for current todo from user input
    const [addTodo, setAddTodo] = useState('')
    //credentials object from context
    const { credentials } = useContext(UserCredentials)
    const [error, setError ] = useState("")
    
    //declare token
    let token;
    //if props.authToken is truthy
    if(props.authToken){
        //set token to token passed from props
        token = props.authToken
    }

    //deconstruct credentials object
    const { username, password } = credentials

    //getTodos function
    const getTodos = async () => {
        try {
            console.log(token)
            //response for api fetch request with username from credentials put into the query
            const response = await fetch(`/tasks/getTodos?username=${username}`,{
                //get request 
                method: "GET",
                //insert token into authorization headers/specify content type
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            //if response status is not okay
            if(!response.ok){
                throw new Error ("Error fetching data")
            }
            //await response from api call and put in tasks variable
            const tasks = await response.json();
            console.log(tasks.todos)
            //setTodos state to response from api call
            setTodos(tasks.todos)
            //handle potential errors
        } catch(error) {
            console.log(error)
        }
    }

    //useEffect to make a get request when the component mounts to load the todos from the api
    useEffect(()=>{
        //call function
        getTodos()
        //use empty array as dependency to only trigger useEffect hook once 
    },[])
        
    //addToDB function
    const addToDB = async (updatedTodos) => {
        try {
            //make put request to api
            const response = await fetch('/tasks/addTodo', {
                //use token in auth header
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                //get username from credentials context and get todos from todos state
                body: JSON.stringify({
                    username: credentials.username,
                    todos: updatedTodos
                })
            })
            //await response from api call and put in variable
            const responseData = await response.json();
            console.log(responseData)
            if(!response.ok){
                setError(responseData)
                setTimeout(() => {
                    setError("")
                }, 5000)
            }
            getTodos()
            //catch potential errors
        } catch (error) {
            console.log(error)
        }
    }
    //handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(addTodo)
        //updatedTodos is equal to spread todos state with a new object that has the current addTodo state as its title vale, and completed as false
        const updatedTodos = [...todos, { title: addTodo, completed: false}]
        //setTodos piece of state as updated todos 
        console.log(updatedTodos)
        //call add to database function
        addToDB(updatedTodos)
        setAddTodo("")
        
    }
    //handle removing a todo
    const handleRemoveTodo = (index) => {
        //updated todos equals todos with filtered method checking if the index doesn't equal the given index
        const updatedTodos = todos.filter((_, i) => i !== index)
        //setTodos state to this updated todos 
        console.log(updatedTodos)
        addToDB(updatedTodos)
    }

    //handle mark todo as complete
    const handleCompleteTodo = (index) => {
        //update todos with a new variable with current todos spread
        const updatedTodos = [...todos];
        //set updated todos at the given index's completed property to inverse of what it currently is 
        updatedTodos[index].completed = !updatedTodos[index].completed;
        addToDB(updatedTodos)
    }

    //handle editing a todo
    const handleEdit = (index, updatedTodo) => {
        //spread todos array to new array
        const updatedTodos = [...todos];
        //set title prop of todo at given index to updatedTodo passed from function call
        updatedTodos[index].title = updatedTodo
        //addToDB
        addToDB(updatedTodos)
    }

    //two lists are conditionally rendered, one checks if the items are not completed and the other checks if they are 
    //they are then mapped to a list item
    //onCHange they call handleCompleteTodo function and are passed the index as a parameter
    //cheched is set as the todo's completed prop
    return (
        <Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh'
            }}> 
                <Paper sx={{p: 5}}>
                {error && <Typography variant="body1">{error.error || error.message}</Typography>}
                <List sx={{width: '100%'}}>{todos.map((todo, index) =>(
                    !todo.completed ? (
                        <TodoItem
                         key={`incomplete-${index}`}
                         index={index}
                         todo={todo}
                         handleCompleteTodo={handleCompleteTodo}
                         handleEdit={handleEdit}
                         />
                    ) : null
                    ))}
                </List>
                {todos.some(todo => todo.completed) && (
                    <div>
                    <Typography>Completed✅</Typography>
                     <List style={{fontStyle: 'italic'}}>   
                     {todos.map((todo, index) =>(
                         todo.completed ? (
                         <TodoItem
                          key={`complete-${index}`} 
                          index={index}
                          todo={todo}
                          handleRemoveTodo={handleRemoveTodo}
                          completeTodo='true'
                         />
                         ): null
                     ))}
                     </List>
                    </div>     
                )}
                <Box component="form" sx={{display: 'flex', justifyContent: 'center'}}>
                    <TextField 
                    variant="standard" 
                    onChange={(e)=>setAddTodo(e.target.value)}
                    multiline
                    maxLength={140}
                    value={addTodo}
                     />
                    <Button onClick={handleSubmit}>Add</Button>
                </Box>
                </Paper>
            </Box>
        </Container>
    )
}