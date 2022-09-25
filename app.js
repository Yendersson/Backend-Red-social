import express from 'express';
import DB from './connectDB.js';
import cors from 'cors';

// routes
import routerAuth from './routes/auth.js';
import routerPosted from './routes/post.js';
import routerProfile from './routes/profile.js';
import routerComentar from './routes/commentarios.js';

const app = express();


app.use(cors());

// app.use(express.static('public/frontend/build'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.json('Hello wor')
})



DB.connect();

app.use('/auth', routerAuth);
app.use('/profile', routerProfile);
app.use('/feed', routerPosted);
app.use('/comments', routerComentar);


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=> console.log('servidor express escuchando en puerto', PORT));
server.on('error', error => console.log(error.message));