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
            <Box display="flex" gap={1}>
                <Input
                    type="text"
                    placeholder="Add task"
                    value={newTodoBody}
                    onChange={(e) => setNewTodoBody(e.target.value)}
                    autoFocus
                    fullWidth
                    disableUnderline
                    sx={{ minWidth: "95px", fontSize: "1.1rem", pl: "10px", border: "solid", borderColor: "rebeccapurple" }}
                />
                <Button
                    type="submit"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "50px",
                        padding: "10px",
                        border: "solid"
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