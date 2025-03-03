import React, {useState} from "react";
import { Button, Box, Input, CircularProgress } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {BASE_URL, Todo} from "../App.tsx";

const TodoForm = ({addTodo}: {addTodo:(newTodo:Todo)=>void}) => {
    const [newTodoBody, setNewTodoBody] = useState<string>("");
    const [isCreating, setIsCreating] = useState<boolean>(false);

    async function createTodo(event:React.FormEvent){
        event.preventDefault();
        setIsCreating(true);
        try{
            const res = await fetch(BASE_URL + `/todos`, {
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({body:newTodoBody})
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "createTodo failed");
            }
            addTodo(data.data);
            setNewTodoBody("");
            return data.data;
        }
        catch(e:any){
            throw new Error(e);
        }
        finally{
            setIsCreating(false);
        }
    }

    return (
        <form data-testid="todoForm" onSubmit={createTodo}>
            <Box display="flex" gap={2}>
                <Input
                    type="text"
                    placeholder="Add task"
                    value={newTodoBody}
                    onChange={(e) => setNewTodoBody(e.target.value)}
                    autoFocus
                    fullWidth
                    sx={{ flexGrow: 1, fontSize: "1.1rem", padding: "10px", border:"solid" }}
                />
                <Button
                    type="submit"
                    sx={{
                        mx: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "50px",
                        padding: "10px",
                    }}
                >
                    {isCreating ? (
                        <CircularProgress size={24} />
                    ) : (
                        <AddCircleOutlineIcon />
                    )}
                </Button>
            </Box>
        </form>
    );
};

export default TodoForm;