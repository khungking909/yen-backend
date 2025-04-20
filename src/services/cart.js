import Cart from "../models/cart.js";

const getAllProductsIntoCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: userId } });

    return cart.products || [];
  } catch (error) {
    throw error;
  }
};

const addToCart = async (userId, product) => {
  try {
    let cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      cart = await Cart.create({
        userId,
        products: [product],
      });
    } else {
      const existingProducts = cart.products || [];

      const productIndex = existingProducts.findIndex(
        (p) => p.id === product.id
      );

      if (productIndex !== -1) {
        const existingProduct = existingProducts[productIndex];

        const isSameExceptQuantity = (obj1, obj2) => {
          const { quantity: _, ...rest1 } = obj1;
          const { quantity: __, ...rest2 } = obj2;
          return Object.keys(rest1).length === Object.keys(rest2).length &&
                 Object.entries(rest1).every(([key, value]) => rest2[key] === value);
        }; 
          
        if (isSameExceptQuantity(existingProduct, product)) {
          existingProducts[productIndex].quantity += product.quantity;
        } else {
          existingProducts.push(product);
        }
      } else {
        existingProducts.push(product);
      }

      await Cart.update(
        { products: existingProducts },
        { where: { user_id: userId } }
      );
    }

    return cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

const removeCartItemByIdProduct = async (userId, productId) => {  
  try {
    const cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const updatedProducts = cart.products.filter((product) => String(product.id) !== String(productId));

    await Cart.update(
      { products: updatedProducts },
      { where: { user_id: userId } }
    );

    return updatedProducts;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

const updateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const updatedProducts = cart.products.map((product) => {
      if (String(product.id) === String(productId)) {
        return { ...product, quantity };
      }
      return product;
    });

    await Cart.update(
      { products: updatedProducts },
      { where: { user_id: userId } }
    );

    return updatedProducts;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};


export default { addToCart, getAllProductsIntoCartByUserId, removeCartItemByIdProduct, updateCartItemQuantity };