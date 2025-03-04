import {Container, Stack} from "@mui/material";
import Header from "./components/Header.tsx";
import TodoForm from "./components/TodoForm.tsx";
import TodoList from "./components/TodoList.tsx";
import {useState} from "react";

export const BASE_URL = "http://localhost:5001/api";
export type Todo = {
    id:number;
    body:string;
    completed:boolean;
}

function App() {
    const [todos,setTodos] = useState<Todo[]>([]);

    function addTodo(newTodo:Todo){
        setTodos(prevTodos=>[...prevTodos,newTodo]);
    }

    return (
        <Stack spacing={2} alignItems="center">
            <Container
            >
                <Header />
            </Container>
            <Container
                sx={{width:"50%"}}
            >
                <TodoForm addTodo={addTodo} />
                <TodoList todos={todos} setTodos={setTodos}/>
            </Container>
        </Stack>
    );
}

export default App
