import 'dotenv/config.js'
import DB from "../connectDB.js";
import  Jwt  from "jsonwebtoken";
import transporter from '../mail/nodemailer.js';

//--------------------------------------------------------------- REGISTER ------------------------------------------------------------------------------
const register = (req, res) => {
    let {email, nombre, username, password } = req.body;
    const insertUser = `INSERT INTO user (EMAIL, NOMBRE, USERNAME, PASSWORD) VALUES(?, ?, ?, ?)`;

    DB.con.query(insertUser, [email,nombre,username,password], (error, results, fields) => {
        if(error) return res.json({err: error, msg:'los datos ingresados no cumplen los requisitos o se exeden a los mismos'});
        console.log('all good');
        console.log(results);

          // SEND MAIL TO REGISTER
        const mailOptions = {
            from: '"Welcome" <newcommerce235@gmail.com>',
            to: email,
            subject: 'Sendin Email using Node.Js',
            text: 'Thats was easy',
            html: `Welcome ${nombre} to our app.
            Your username is: ${username}. That username is visible to all people that use the app`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error) return console.log(error);
    
            console.log('Email sent :' + info.response);
        res.json({err: null, msg:'Account Created...'});

        
    })
        })
    
};

//----------------------------------------------------------------- LOGIN -----------------------------------------------------------------------------
const login = (req, res) => {
    console.log(req.body);
    let {email,password} = req.body;
    
    const existData = `SELECT * FROM user WHERE EMAIL = ? and PASSWORD = ?`;

    DB.con.query(existData, [email, password], (error, results, fields) => {
        if(error) throw error;

        if(!results.length>0) return res.
        json({
            err: true,
            msg:'Email or password incorrect'
        });

        
        const id = results[0].ID_USER;
        const username = results[0].USERNAME

       const token = Jwt.sign({
            id: id,
            username: username
        },
        process.env.SECRET_TOKEN,
        {expiresIn: '1d'});

            console.log(token);
            res.set('Authorization', token).
            json(
                {err: null, 
                    id, 
                    token, 
                    msg: 'Login successfully'
                });
    })
}

export default {
    register,
    login

}