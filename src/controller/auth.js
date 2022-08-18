const db = require('../db');
const {hash} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const {SECRET} = require('../constants');


exports.getUsers = async (req,res) => {
    try {
        const {rows} = await db.query('SELECT user_id,email FROM users');
        
        return res.status(200).json({
            success: true,
            users:rows
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.register = async (req,res) => {
    const {email,password} = req.body;
    try {
        const hashpassword = await hash(password,10);
        
        await db.query('INSERT INTO users (email,password) VALUES ($1 , $2)',[email,hashpassword]);

        return res.status(201).json({
            success: true,
            message: 'The registration was successful'
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error : error.message
        })
    }
}

exports.login = async (req,res) => {
    let user = req.user;

    let payload = {
        id:user.user_id,
        email:user.email,
    }

    try {
        const token = await sign(payload,SECRET);
        return res.status(200).cookie('token',token, {httpOnly :true}).json({
            success: true,
            message: 'The logged was successful',
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error : error.message
        })
    }
}

exports.protected = async (req,res) => {
    try {
        return res.status(200).json({
            info : 'protected info',
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.logout = async (req,res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly :true}).json({
            success: true,
            message: 'logged out in successful',
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error : error.message
        })
    }
}