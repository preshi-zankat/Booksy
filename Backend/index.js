import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
connectDB();
import userRoute from './routes/user.route.js'
import bookRoute from './routes/book.route.js';
import reviewRoute from './routes/review.route.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
));

app.use(express.json());

app.use('/api/v1/user',userRoute)
app.use('/api/v1/books',bookRoute)
app.use('/api/v1/reviews',reviewRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
