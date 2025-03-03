import {Box, Typography, Chip, CircularProgress} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {Todo,BASE_URL} from "../App.tsx";
import {useState} from "react";

const TodoItem = ({ todo, updateTodoInList, deleteTodoInList }: { todo: Todo, updateTodoInList: (updatedTodo:Todo)=>void, deleteTodoInList: (deletedTodo:Todo)=>void}) => {

    const [isUpdating,setIsUpdating] = useState<Boolean>(false);
    const [isDeleting, setIsDeleting] = useState<Boolean>(false);

    async function updateTodo (){
        setIsUpdating(true);
        if(todo.completed){
            return alert("You have already completed this todo item!");
        }
        try {
            const res = await fetch(BASE_URL + `/todos/${todo.id}`, {
                method:"PATCH"
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "updatedTodo failed");
            }
            updateTodoInList(data.data);
            return data.data;
        }
        catch(e){
            console.log(e);
        }
        finally {
            setIsUpdating(false);
        }
    }

    async function deleteTodo(){
        setIsDeleting(true);
        try{
            const res = await fetch(BASE_URL + `/todos/${todo.id}`,{
                method:"DELETE"
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "deleteTodo failed");
            }
            deleteTodoInList(data.data);
            return data.data;
        }
        catch(e){
            console.log(e);
        }
        finally {
            setIsDeleting(false);
        }
    }

    return (
        <Box data-testid="todoItem" display="flex" gap={2} alignItems="center">
            <Box
                flex={1}
                display="flex"
                alignItems="center"
                border="1px solid"
                borderColor="grey.600"
                p={2}
                borderRadius={2}
                justifyContent="space-between"
            >
                <Typography
                    data-testid="todoItemText"
                    color={todo.completed ? "green" : "orange"}
                    sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
                >
                    {todo.body}
                </Typography>

                <Chip
                    data-testid="todoItemProgress"
                    label={todo.completed ? "Done" : "In Progress"}
                    color={todo.completed ? "success" : "warning"}
                    size="small"
                    sx={{ ml: 1 }}
                />
            </Box>

            <Box display="flex" gap={2} alignItems="center">
                <Box color="green" sx={{ cursor: "pointer" }} onClick={()=> updateTodo()}>
                    {!isUpdating ? <CheckCircleIcon/> : <CircularProgress/>}
                </Box>
                <Box color="red" sx={{ cursor: "pointer" }} onClick={()=> deleteTodo()}>
                    {!isDeleting ? <DeleteIcon/> : <CircularProgress/>}
                </Box>
            </Box>
        </Box>
    );
};

export default TodoItem;