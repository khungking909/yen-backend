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
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  }
);

export default Coupon;
