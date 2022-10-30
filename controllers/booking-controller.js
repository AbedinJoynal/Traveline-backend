import express from 'express';
import Booking from '../model/Booking';
import mongoose from 'mongoose';
import User from '../model/User';
export const getAllBooking = async (req, res, next) => {
    let bookings;
    try {
        bookings = await Booking.find().populate('user');
    } catch (error) {
        console.log(error);
    }
    if (!bookings) {
        res.status(404).json({ message: 'No Booking Found' });
    }
};
export const AddBooking = async (req, res, next) => {
    const { user, description, title, image } = req.body;
    let existinguser;
    try {
        existinguser = await User.findById(user);
    } catch (error) {
        console.log(error);
    }
    if (!existinguser) {
        res.status(404).json({ message: 'User Not Found' });
    }

    const booking = new Booking({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.save({ session });
        existinguser.bookings.push(booking);
        await existinguser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
    return res.status(200).json({ booking });
};
export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findById(id);
    } catch (error) {
        console.log(error);
    }
    if (!booking) {
        res.status(404).json({ message: 'No Booking Found' });
    }
};
export const updateBooking = async (req, res, next) => {
    const bookingId = req.params.id;
    const { description, title } = req.body;
    let booking;
    try {
        booking = await Booking.findByIdAndUpdate(bookingId, {
            description,
            title,
        });
    } catch (error) {
        console.log(error);
    }
    if (!booking) {
        res.status(404).json({ message: 'Booking cannot be updated' });
    }
};
export const deleteBookingByUser = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findByIdAndRemove(id).populate('user');
        await booking.user.bookings.pull(booking);
        await booking.user.save();
    } catch (error) {
        console.log(error);
    }
    if (!booking) {
        res.status(404).json({ message: 'No Booking Found' });
    }
};
export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userWithBooking;
    try {
        userWithBooking = await User.findById(userId).populate('bookings');
    } catch (error) {
        console.log(error);
    }
    if (!userWithBooking) {
        res.status(404).json({ message: 'No Booking Found' });
    }
    return res.status(200).json({ user: userWithBooking });
};
