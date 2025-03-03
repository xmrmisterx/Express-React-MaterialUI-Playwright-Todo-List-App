import pkg from "pg";
import dotenv from "dotenv";
const {Pool} = pkg;

dotenv.config();

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

pool.on("connect", ()=> {
    console.log("Connection established with database");
})

export default pool;
