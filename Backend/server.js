import express from 'express';
import cors from 'cors';
import convertRouter from './Routes/convertRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',convertRouter)

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
