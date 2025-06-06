import { DataTypes } from "sequelize";
import { DB } from "../databases/connect.js";

const Cart = DB.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    products: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "carts",
    timestamps: true,
  }
);

export default Cart;
