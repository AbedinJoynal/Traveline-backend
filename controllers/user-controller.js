import express from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        res.status(404).json({ message: 'No User Found' });
    }
    res.status(200).json({ users });
};
export const signup = async (req, res, next) => {
    const { email, password, name } = req.body;
    let existinguser;
    try {
        existinguser = await User.findOne({ email: email });
    } catch (error) {
        console.log(error);
    }
    if (existinguser) {
        res.status(404).json({ message: 'User Already Exists' });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        email,
        password: hashedPassword,
        name,
    });
    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
    res.status(201).json({ user });
};
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existinguser;
    try {
        existinguser = await User.findOne({ email: email });
    } catch (error) {
        console.log(error);
    }
    if (!existinguser) {
        res.status(404).json({ message: 'User Not Found' });
    }
    const isValidPassword = bcrypt.compareSync(password, existinguser.password);
    if (!isValidPassword) {
        res.status(404).json({ message: 'Invalid Password' });
    }
    res.status(200).json({ message: 'Logged In', user: existinguser });
};
