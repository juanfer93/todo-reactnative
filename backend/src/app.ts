import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import todoRoutes from './routes/route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);

export default app;
