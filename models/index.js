const Sequelize = require("sequelize");
const sequelize = new Sequelize('testdb', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.courses = require("./course.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

db.sequelize.sync().then(() => {
    console.log("Synced db.");
});

module.exports = db;
