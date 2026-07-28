import { createContext, useEffect, useState } from "react";
import {
   getCart,
   saveCart,
   clearCart as clearLocalCart,
} from "../utils/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const [cart, setCart] = useState([]);

   useEffect(() => {
      setCart(getCart());
   }, []);

   const addToCart = (product, quantity = 1) => {
      const currentCart = getCart();

      const index = currentCart.findIndex(
         (item) => item.product_id === product.id
      );

      if (index >= 0) {
         currentCart[index].quantity += quantity;
      } else {
         currentCart.push({
            product_id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity,
         });
      }

      saveCart(currentCart);
      setCart([...currentCart]);
   };

   const updateQuantity = (productId, quantity) => {
      if (quantity < 1) return;

      const updatedCart = cart.map((item) =>
         item.product_id === productId
            ? { ...item, quantity }
            : item
      );

      saveCart(updatedCart);
      setCart(updatedCart);
   };

   const removeItem = (productId) => {
      const updatedCart = cart.filter(
         (item) => item.product_id !== productId
      );

      saveCart(updatedCart);
      setCart(updatedCart);
   };

   const clearCart = () => {
      clearLocalCart();
      setCart([]);
   };

   const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
   );

   const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   );

   return (
      <CartContext.Provider
         value={{
            cart,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
            totalItems,
            totalPrice,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};

export default CartContext;