const { DataTypes} = require('sequelize');

const sequelize = require('../db')

const musers = sequelize.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    email: DataTypes.STRING

});

module.exports = musers;