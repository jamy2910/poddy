import pkg from 'pg';
const {Pool} = pkg;

import dotenv from 'dotenv'
dotenv.config();

const db = new Pool(
    {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE
    }
)

export default db;
