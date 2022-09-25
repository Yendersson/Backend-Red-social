import express from 'express';
import comentarios from '../controllers/comentarios.js';
import verifyToken from '../jwt/verifyToken.js';

const routerComentar = express.Router();

routerComentar.get('/:post', comentarios.getComments);

// usamos el ID_USER como query
routerComentar.post('/:post', verifyToken.validateToken, comentarios.postComments);

// routerComentar.put('/:comentario', verifyToken.validateAndAuthorization, comentarios.putComments);

// routerComentar.delete('/:post', verifyToken.validateAndAuthorization, comentarios.deleteComments);

export default routerComentar;