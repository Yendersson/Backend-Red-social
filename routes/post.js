import express from 'express';
import post from '../controllers/post.js';
import verifyToken from '../jwt/verifyToken.js';

const routerPosted = express.Router();

routerPosted.get('/:id?',verifyToken.validateToken ,post.getPosted);

routerPosted.post('/:id',verifyToken.validateToken, post.postPosted);

// usar el ID_USER como query
routerPosted.put('/:idPost', verifyToken.validateAndAuthorization, post.putPosted);

routerPosted.delete('/:idPost',verifyToken.validateAndAuthorization, post.deletePosted);

export default routerPosted;
