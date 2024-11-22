const db = require("../models");
const httpStatusText = require("../utils/httpStatusText");
const User = db.users;
const Op = db.Sequelize.Op;
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generateJWT");
require('dotenv').config();


// Create and Save a new Tutorial
exports.register = asyncWrapper(async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Validate request
    const user = { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        avatar: req.file.filename
    };
    
    console.log("req.file->", req.file);

    const olduser = await User.findOne({ where: { userName: user.userName } });

    if (olduser) {
        const err = appError.create("User already exists", 400, httpStatusText.FAIL);
        return next(err);
    }

    const token = await generateJWT({ userName: user.userName, role: user.role });
    user.token = token;


    // Save the user to the database
    await User.create(user);
    res.status(201).json({ data: user,httpStatusText: httpStatusText.SUCCESS });
});
    
        




// Retrieve all Tutorials from the database.
exports.getAllUsers = asyncWrapper( async(req, res) => {
    console.log(req.headers);
    
    const userName = req.query.userName;
    var condition = userName ? { userName: { [Op.iLike]: `${userName}` } } : null;
    
    const data = await User.findAll({ where: condition , attributes: { exclude: ['password'] } });
    res.status(200).json({ data :data , httpStatusText : httpStatusText.SUCCESS });
    });
exports.login = asyncWrapper(async(req, res,next) => {
    const user  = {
        email : req.body.email,
        password : req.body.password
    }
    if(!user.email && !user.password){
        const err = appError.create("Please provide email and password",400,httpStatusText.FAIL);
        return next(err);
    }

    const userdb = await User.findOne({where :{email: user.email}});
    if(!userdb){
        const err = appError.create("Invalid email or password",400,httpStatusText.FAIL);
        return next(err);
    }
    const matchedPassword = await bcrypt.compare(user.password , userdb.password);
    
    if(matchedPassword){
        const token = await generateJWT({ userName: userdb.userName,role: userdb.role });
        res.status(200).json({ token : token , httpStatusText : httpStatusText.SUCCESS});
    }else{
        const err = appError.create("Invalid email or password",400,httpStatusText.FAIL);
        return next(err);
    }
    });

