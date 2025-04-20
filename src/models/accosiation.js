import Product from "./product.js";
import Review from "./review.js";
import User from "./user.js";

export function associateModels() {
  Product.hasMany(Review, { foreignKey: 'productId' });
  Review.belongsTo(Product, { foreignKey: 'productId' });
  Review.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Review, { foreignKey: 'userId' });
}