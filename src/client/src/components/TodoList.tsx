import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import TodoItem from "./TodoItem";
import {useQuery} from "@tanstack/react-query";
import {BASE_URL} from "../App.tsx";

export type Todo = {
    id:number;
    body:string;
    completed:string;
}

const TodoList = () => {
    // Use Tanstack Query to manage todos list
    const {data: todos, isLoading} = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            try{
                const res = await fetch(BASE_URL + `/todos`);
                const parsedRes = await res.json();
                const data = parsedRes.data;
                // console.log("data:", data);

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data || [];
            }
            catch (e) {
                console.log("useQuery err:", e);
            }
        }
    });

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
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </Stack>
        </>
    );
};

export default TodoList;