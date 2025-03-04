import { AppBar, Typography, Box } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static">
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "steelblue" }}>
                    <Typography variant="h3" sx={{ padding: "5px" }}>To-do List App</Typography>
                </Box>
        </AppBar>
    );
}