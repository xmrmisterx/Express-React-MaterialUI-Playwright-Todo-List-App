import {Box, Typography, Chip, CircularProgress} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {Todo} from "./TodoList.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BASE_URL} from "../App.tsx";

const TodoItem = ({ todo }: { todo: Todo }) => {
    const queryClient = useQueryClient();
    const {mutate:updateTodo, isPending:isUpdating} = useMutation({
        mutationKey:["updateTodo"],
        mutationFn: async ()=> {
            if(todo.completed){
                return alert("Todo item already completed!")
            }
            try {
                const res = await fetch(BASE_URL + `/todos/${todo.id}`, {
                    method:"PATCH",
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            }
            catch (e) {
                console.log(e);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["todos"]});
        }
    });

    const {mutate:deleteTodo,isPending:isDeleting} = useMutation({
        mutationKey:["deleteTodo"],
        mutationFn:async()=>{
            try {
                const res = await fetch(BASE_URL + `/todos/${todo.id}`,{
                    method:"DELETE"
                });
                const data = await res.json();

                if(!res.ok){
                    throw new Error(data.error || "Something went wrong")
                }
                return data;
            }
            catch(e){
                console.log(e);
            }
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["todos"]});
        }
    });

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