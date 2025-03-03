import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, {useState, useEffect, SetStateAction} from "react";
import TodoItem from "./TodoItem";
import {BASE_URL, Todo} from "../App.tsx";

const TodoList = ({todos, setTodos}: {todos:Todo[], setTodos:React.Dispatch<SetStateAction<Todo[]>>}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(BASE_URL + "/todos")
            .then(res=>res.json())
            .then(data=>{
                setTodos(data.data);
            })
            .finally(()=>setIsLoading(false));
    }, []);

    function updateTodoInList(updatedTodo:Todo){
        setTodos(prevTodos=>
            prevTodos.map(todo=>todo.id===updatedTodo.id ? updatedTodo : todo)
        );
    }

    function deleteTodoInList(deletedTodo:Todo){
        setTodos(prevTodos=>
            prevTodos.filter(todo => todo.id !== deletedTodo.id)
        );
    }

    return (
        <>
            <Typography
                data-testid="todoListTitle"
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                textTransform="uppercase"
                sx={{
                    background: "linear-gradient(to left, #0b85f8, #00ffff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                my={2}
            >
                Today's Tasks
            </Typography>

            {isLoading && (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress size={40} />
                </Box>
            )}

            {!isLoading && todos?.length === 0 && (
                <Stack alignItems="center" spacing={2}>
                    <Typography variant="h6" color="gray">
                        Tasks complete!
                    </Typography>
                </Stack>
            )}

            <Stack spacing={3}>
                {todos?.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} updateTodoInList={updateTodoInList} deleteTodoInList={deleteTodoInList}/>
                ))}
            </Stack>
        </>
    );
};

export default TodoList;