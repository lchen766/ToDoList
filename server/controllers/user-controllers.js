const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Invalid inputs passed, please check your data.' });
    }

    const { name, email, password } = req.body;

    // Check for existing user
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return res.status(500).json({ error: 'Signing up failed, please try again later.' });
    }

    if (existingUser) {
        return res.status(422).json({ error: 'User exists already, please login instead.' });
    }

    // Hash password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return res.status(500).json({ error: 'Could not create user, please try again.' });
    }

    // Create user
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        tasks: []
    });

    // Save user to db
    try {
        await createdUser.save();
    } catch (err) {
        return res.status(500).json({ error: 'Creating user failed, please try again.' });
    }

    // Generate token
    let token;
    try {
        token = jwt.sign(
            { id: createdUser.id, email: createdUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return res.status(500).json({ error: 'Signing up failed, please try again later.' });
    }

    res.status(201).json({
        user: {
            name: createdUser.name,
            email: createdUser.email
        },
        token: token
    });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return res.status(500).json({ error: "Logging in failed, please try again!"})
    }

    if (!existingUser) {
        return res.status(401).json({ error: 'User does not exist, could not log you in.' });
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return res.status(500).json({ error: 'Could not log you in, please check your credentials and try again.' });
    }

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials, could not log you in.' });
    }

    let token;
    try {
        token = jwt.sign(
            { id: existingUser.id, email: existingUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return res.status(500).json({ error: 'Logging in failed, please try again.' });
    }

    res.json({
        user: {
            name: existingUser.name,
            email: existingUser.email
        },
        token: token
    });
};

const validateToken = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ user });
    } catch (err) {
        return res.status(500).json({ error: 'Token validation failed.' });
    }
};

module.exports = {
    signup,
    login,
    validateToken
};
