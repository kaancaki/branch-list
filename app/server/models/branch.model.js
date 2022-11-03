const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Branch = sequelize.define("branch", {
        latitude:{
            type: Sequelize.STRING
        },
        longlitude:{
            type: Sequelize.STRING
        },
        name:{
            type: Sequelize.STRING
        },
        full_adress:{
            type: Sequelize.STRING
        },
        phone:{
            type: Sequelize.STRING
        },
        branch_code:{
            type: Sequelize.STRING,
            unique: true
        }
    });

    return Branch;
}