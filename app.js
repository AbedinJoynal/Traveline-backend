import express from 'express';
import cors from 'cors';
import bookingRouter from './routes/booking-routes';
import router from './routes/user-routes';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/booking', bookingRouter);
const DB = process.env.MONGO_URI;
app.get('/api/user', router);
mongoose
    .connect(DB)
    .then(() => {
        app.listen(process.env.PORT || 8000);
    })
    .then(() => {
        console.log('connected to database and server');
    });

// app.listen(8000, (req, res, next) => {
//     console.log('Server is connected and running on port 8000');
// });
app.get('/', (req, res, next) => {
    res.send('Server connected to Traveline');
});

//mongodb+srv://dbuser:xWn5dLb2chhLVnq@cluster1.vxc7trs.mongodb.net/?retryWrites=true&w=majority
