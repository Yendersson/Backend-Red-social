// import 'dotenv/config.js'
import sql from 'mysql';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config';

const con = sql.createConnection({
    host:DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
    // host: 'localhost',
    // user: 'root',
    // password: '95790078Yc*',
    // database: 'postest'
});

const connect = ()=>{

    console.log('connecting to database');
    con.connect(error=> {
        if(error) throw error;
        console.log('connect to the database successfully');
    })
}

export default {
    con,
    connect
};