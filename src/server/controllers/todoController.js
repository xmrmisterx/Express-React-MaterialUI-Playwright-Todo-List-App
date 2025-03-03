import {
    createTodoService,
    deleteTodoService,
    getAllTodosService,
    getTodoByIdService,
    updateTodoService
} from "../models/todoModel.js";

// Standardized response function
const handleResponse = (res, status, message, data=null) => {
    res.status(status).json({
        status,
        message,
        data
    });
}

export const createTodo = async (req,res,next) => {
    const body = req.body;
    try{
        const newTodo = await createTodoService(body.body);
        handleResponse(res,201,"Todo created successfully", newTodo);
    }
    catch (err){
        next(err);
    }
}

export const getAllTodos = async (req,res,next) => {
    try{
        const todos = await getAllTodosService();
        handleResponse(res,200,"Todos fetched successfully", todos);
    }
    catch (err){
        next(err);
    }
}

export const getTodoById = async (req,res,next) => {
    try{
        const todo = await getTodoByIdService(req.params.id);
        if (!todo) {
            return handleResponse(res,404,"Todo not found");
        }
        handleResponse(res,200,"Todo fetched successfully", todo);
    }
    catch (err){
        next(err);
    }
}

export const updateTodo = async (req,res,next) => {
    try{
        const updatedTodo = await updateTodoService(req.params.id);
        if (!updatedTodo) {
            return handleResponse(res,404,"Todo not found");
        }
        handleResponse(res,200,"Todo updated successfully", updatedTodo);
    }
    catch (err){
        next(err);
    }
}

export const deleteTodo = async (req,res,next) => {
    try{
        const deletedTodo = await deleteTodoService(req.params.id);
        if (!deletedTodo) {
            return handleResponse(res,404,"Todo not found");
        }
        handleResponse(res,200,"Todo deleted successfully", deletedTodo);
    }
    catch (err){
        next(err);
    }
}