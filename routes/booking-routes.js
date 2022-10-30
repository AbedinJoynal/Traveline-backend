import express from 'express';
const bookingRouter = express.Router();
import {
    getAllBooking,
    AddBooking,
    getBookingById,
    updateBooking,
    deleteBookingByUser,
    getByUserId,
} from '../controllers/booking-controller.js';
bookingRouter.get('/', getAllBooking);
bookingRouter.post('/add', AddBooking);
bookingRouter.get('/:id', getBookingById);
bookingRouter.put('/update/:id', updateBooking);
bookingRouter.delete('/:id', deleteBookingByUser);
bookingRouter.delete('/user/:id', getByUserId);

export default bookingRouter;
