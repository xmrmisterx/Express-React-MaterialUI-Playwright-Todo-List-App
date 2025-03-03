import pool from "../config/db.js";

export const getAllTodosService = async () => {
    const result = await pool.query("SELECT * FROM todos");
    return result.rows;
}

export const getTodoByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM todos WHERE id=$1", [id]);
    return result.rows[0];
}

export const createTodoService = async (body) => {
    const result = await pool.query("INSERT INTO todos(completed,body) VALUES($1,$2) RETURNING *", [false,body]);
    return result.rows[0];
}

export const updateTodoService = async (id) => {
    const result = await pool.query("UPDATE todos SET completed=$1 WHERE id=$2 RETURNING *", [true,id]);
    return result.rows[0];
}

export const deleteTodoService = async (id) => {
    const result = await pool.query("DELETE FROM todos WHERE id=$1 RETURNING *",[id]);
    return result.rows[0];
}