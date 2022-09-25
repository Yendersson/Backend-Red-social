import express from 'express';
import profile from '../controllers/profile.js';
import validateToken from '../jwt/verifyToken.js'

const routerProfile = express.Router();

routerProfile.get('/:id', validateToken.validateAndAuthorization, profile.getMyProfile);

routerProfile.put('/:id', validateToken.validateAndAuthorization, profile.putMyProfile);

routerProfile.delete('/:id', validateToken.validateAndAuthorization, profile.deleteMyProfile);

export default routerProfile;