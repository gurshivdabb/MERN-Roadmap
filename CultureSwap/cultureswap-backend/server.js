import express from 'express';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';

import userRouter from './routes/userRoutes.js';
import experienceRouter from './routes/experienceRoutes.js';

dotenv.config();

// connect to MongoDB
connectDB();

// Middleware
const app = express();
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/experiences', experienceRouter);

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
