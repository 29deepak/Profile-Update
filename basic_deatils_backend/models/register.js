const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Register = sequelize.define('register', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    mobilenumber: Sequelize.STRING,
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    address: Sequelize.STRING,
    profile: {
        type: Sequelize.JSON,
        defaultValue: ""

    }

});

module.exports = Register;