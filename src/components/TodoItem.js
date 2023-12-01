import React, { useState } from 'react'
import {
    ListItem,
    IconButton,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    ListItemText,
    Box,
    TextField,
    Button,
    Stack
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
export default function TodoItem(props) {
const { 
  index, 
  todo, 
  handleCompleteTodo, 
  handleRemoveTodo, 
  completeTodo, 
  handleEdit,

} = props

const checkBoxFunction = handleCompleteTodo || handleRemoveTodo

const [updatedTodo, setUpdatedTodo] = useState("")
const [editTodo, setEditTodo] = useState(false)
const handleEditClick = () => {
  setEditTodo(!editTodo)
  setUpdatedTodo("")
  
}


{/*Edit / cancel button */}
  return (
    <ListItem
    secondaryAction={
        !completeTodo? (
            <IconButton edge="end" onClick={handleEditClick}>
                {!editTodo? (
                <EditIcon />
                ): (
                <ClearIcon />
                )}
            </IconButton>
        ) : (
           null 
        ) 
    }
    disablePadding
    sx={{minWidth: 407}}
    >
    <ListItemButton sx={{
      borderRadius: '20px'
    }}>
    <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          onChange={() => checkBoxFunction(index)}
        />
    </ListItemIcon>
    {!editTodo? (
    <ListItemText primary={todo.title}/>
    ): (
        <div>
        <Stack direction="row" spacing={3}>
        <TextField
        variant="standard"
        value={updatedTodo}
        onChange={(e)=>setUpdatedTodo(e.target.value)}
         />
        {/*SAVE BUTTON */}
        <IconButton onClick={()=>handleEdit(index, updatedTodo)}>
         <CheckIcon />
        </IconButton>         
        </Stack> 
        </div>
    )}
    
    </ListItemButton>
    </ListItem>
  )
}
