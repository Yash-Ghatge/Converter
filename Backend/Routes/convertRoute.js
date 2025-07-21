import express from 'express'
import { converts } from '../Controller/convertController.js'
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });

const convertRouter = express.Router()

convertRouter.post('/convert',upload.single('file'),converts)

export default convertRouter