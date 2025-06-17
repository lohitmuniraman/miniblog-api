
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', [authRoutes, blogRoutes]);

export default app;
