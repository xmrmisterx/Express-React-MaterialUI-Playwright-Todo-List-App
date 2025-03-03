import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./routes/todoRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
import createTodoTable from "./data/createTodosTable.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", todoRoutes);

//Error handling
app.use(errorHandling);

//Create table before starting server
await createTodoTable();

//Run server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})