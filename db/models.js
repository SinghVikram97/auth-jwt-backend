const Sequelize = require("sequelize");
const db = new Sequelize("jwtdb", "test", "test", {
  dialect: "mysql",
  host: "localhost"
});

const User=db.define("user",{
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

db.sync().then(() => {
  console.log("Database is Ready");
});

module.exports = { User };
