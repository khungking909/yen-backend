import { DataTypes } from "sequelize";
import { DB } from "../databases/connect.js";

const Review = DB.define(
  "Review",
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
      references: {
        model: "users",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
      references: {
        model: "products",
        key: "id",
      },
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "reviews",
    timestamps: true,
  }
);

export default Review;
