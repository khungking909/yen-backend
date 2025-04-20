import { cartService } from "../services/index.js";

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await cartService.getAllProductsIntoCartByUserId(userId);

    res.status(200).json({
      items: products,
      totalQuantity: products.reduce((acc, product) => acc + product.quantity, 0),
      totalPrice: products.reduce((acc, product) => acc + product.price * product.quantity, 0),
    });
  } catch (error) {
  
    res.status(500).json([]);
  }
};

const addToCart = async (req, res) => {
  const { id } = req.user;
  const { product } = req.body;

  try {
    await cartService.addToCart(id, product);

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

const removeCartItemByIdProduct = async (req, res) => {
  const { id } = req.user;
  const { productId } = req.params;

  try {
    await cartService.removeCartItemByIdProduct(id, productId);

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { id } = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    await cartService.updateCartItemQuantity(id, productId, quantity);

    res.status(200).json({ message: "Product quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product quantity" });
  }

};


export default { getCartByUserId, addToCart, removeCartItemByIdProduct, updateCartItemQuantity };