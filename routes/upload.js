import express from 'express';
import uplaodController from '../controllers/upload.js';

const routerUpload = express.Router();

routerUpload.get("/:pic", uplaodController.getFile)

export default routerUpload;

