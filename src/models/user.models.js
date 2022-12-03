const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

/**
 * @openapi
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true 
 *           example: 1
 *         username:
 *           type: string
 *           example: Darwin
 *         email:
 *           type: string
 *           example: Darwin@gmail.com
 *         password:
 *           type: string
 *           example: abc1234
 *     register:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: Darwin
 *         email:
 *           type: string
 *           example: darwin@gmail.com
 *         password:
 *           type: string
 *           example: abc1234
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: darwin@gmail.com
 *         password:
 *           type: string
 *           example: abc1234
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "user_name"
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        const { password } = user;
        const hash = bcrypt.hashSync(password, 8);
        user.password = hash;
      },
    },
  }
);

module.exports = User;
