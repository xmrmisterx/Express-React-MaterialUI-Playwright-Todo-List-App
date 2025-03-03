import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";

export default function Header() {
    return (
        <Container maxWidth="lg">
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor:"green" }}>
                        <Typography variant="h6">To Do App</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </Container>
    );
}