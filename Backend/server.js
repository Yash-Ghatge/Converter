import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { convertToCanvasCode } from './utils/converter.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/api/convert', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const code = await convertToCanvasCode(filePath, req.file.mimetype);
  res.json({ code });
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
