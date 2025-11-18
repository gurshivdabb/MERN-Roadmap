import express from 'express';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

connectDB(); // connect to MongoDB

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
