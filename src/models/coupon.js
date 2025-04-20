import { DataTypes } from "sequelize";
import { DB } from "../databases/connect.js";

const Coupon = DB.define(
  "Coupon",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "coupon",
    timestamps: true,
  }
);

export default Coupon;
