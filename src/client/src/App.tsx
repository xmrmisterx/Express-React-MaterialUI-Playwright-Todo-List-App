import {Box, Container, Stack} from "@mui/material";
import Header from "./components/Header.tsx";
import TodoForm from "./components/TodoForm.tsx";
import TodoList from "./components/TodoList.tsx";
import {useState} from "react";

export const BASE_URL = "http://localhost:5001/api";
export type Todo = {
    id:number;
    body:string;
    completed:string;
}

function App() {
    const [todos,setTodos] = useState<Todo[]>([]);

    function addTodo(newTodo:Todo){
        setTodos(prevTodos=>[...prevTodos,newTodo]);
    }

    return (
        <Stack spacing={2} alignItems="center">
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "900px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Header />
            </Box>

            <Container
                sx={{
                    width: "70%",
                    maxWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <TodoForm addTodo={addTodo} />
                <TodoList todos={todos} setTodos={setTodos}/>
            </Container>
        </Stack>
    );
}

export default App
