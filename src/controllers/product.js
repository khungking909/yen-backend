import { productService } from "../services/index.js";

const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const products = await productService.getAllProducts(page, limit);

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      message: "server Error!!!",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productService.addProduct(product);

    res.status(201).json(newProduct)
  } catch (error) {
    
    res.status(500).json({
      message: "server Error!!!",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.slug);

    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "server Error!!!",
    });
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
};
