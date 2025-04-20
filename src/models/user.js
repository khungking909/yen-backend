import { DataTypes } from "sequelize";
import { DB } from "../databases/connect.js";

const User = DB.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: "hashed_password",
    },
    avatar: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
