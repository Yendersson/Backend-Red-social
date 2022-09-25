import 'dotenv/config.js'
import sql from 'mysql';

const con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '95790078Yc*',
    database: 'postest'
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