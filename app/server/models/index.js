const config = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.DATABASE,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci', 
            timestamps: true
          }
    }
    
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.branch = require("./branch.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
  
  db.ROLES = ["user", "admin"];
  
  module.exports = db;