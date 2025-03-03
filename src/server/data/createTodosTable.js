import pool from "../config/db.js";

const createTodosTable =  async () => {
    const queryText= `
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            completed BOOLEAN NOT NULL,
            body VARCHAR(100) NOT NULL
        )`;

    try{
        pool.query(queryText);
        console.log("Todos table created if not exists");
    }
    catch(err){
        console.log("Error creating todos table:", err);
    }
}

export default createTodosTable;
