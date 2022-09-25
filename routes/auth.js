import express from 'express';
import auth from '../controllers/auth.js';

const routerAuth = express.Router();

routerAuth.post('/register', auth.register);

routerAuth.post('/login', auth.login);

export default routerAuth;