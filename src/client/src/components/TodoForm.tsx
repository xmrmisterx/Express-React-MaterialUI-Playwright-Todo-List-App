import React, { useState } from "react";
import { Button, Box, Input, CircularProgress } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BASE_URL} from "../App.tsx";

const TodoForm = () => {
    const [newTodo, setNewTodo] = useState("");

    const queryClient = useQueryClient();

    const {mutate:createTodo,isPending:isCreating} = useMutation({
        mutationKey:["createTodo"],
        mutationFn:async (event: React.FormEvent)=>{
            event.preventDefault()
            try{
                const res = await fetch(BASE_URL + `/todos`, {
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({body: newTodo})
                });
                const data:any = res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                setNewTodo("");
                return data;
            }
            catch (e:any) {
                throw new Error(e);
            }
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:["todos"]});
        },
        onError: (e) => {
            alert(e.message);
        }
    })

    return (
        <form data-testid="todoForm" onSubmit={createTodo}>
            <Box display="flex" gap={2}>
                <Input
                    type="text"
                    placeholder={"Add task"}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
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