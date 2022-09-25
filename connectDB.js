// import 'dotenv/config.js'
import sql from 'mysql';

const con = sql.createConnection({
    host:'us-cdbr-east-06.cleardb.net',
    user: 'b45275e215bfec',
    password: '18f09d94',
    database: 'heroku_74b6a8f406e6604'
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