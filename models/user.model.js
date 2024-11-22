const validator = require('validator'); 
const userRoles = require('../utils/userRoles');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Field must be a valid email address",
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        token:{
            type:Sequelize.STRING,
        },
        role:{
            type: Sequelize.STRING, // Spread the values into the ENUM
            allowNull: false,
            defaultValue: userRoles.user,
        },
        avatar:{
            type:Sequelize.STRING,
            defaultValue:'../uploads/profile.jpg'
        }
    });
    return User;
};
