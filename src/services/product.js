import { where } from "sequelize";
import Product from "../models/product.js";

const getAllProducts = async (page, limit) => {
  try {
    if (!page || !limit) {
      const products = await Product.findAll({ raw: true });

      return products;
    }
    
    const offset = (Number(page) - 1) * Number(limit);
    const products = await Product.findAndCountAll({ raw: true, offset: Number(offset), limit: Number(limit) });

    return products.rows;
  } catch (error) {
    return [];
  }
}

const getProductById = async (slug) => {


  try {
    const product = await Product.findOne({ where: { slug },  raw: true });
   
    return product;
  } catch (error) {
    return null;
  }
}

const addProduct = async (product) => {
  try {
    const newProduct = await Product.create(product);

    return newProduct;
  } catch (error) {
    
    return error;
  }
};

const getReviews = async (slug) => {
  try {
    const product = await Product.findOne({ where: { slug }, include: ["reviews"] });

    return product.reviews;
  } catch (error) {
    console.log(error);

    return null;
  }
}


export default { getAllProducts, addProduct, getProductById, getReviews };