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

   // ✅ DIGITAL RULE: Only 1 copy allowed
   const addToCart = (product) => {

      const currentCart = getCart();

      const exists = currentCart.find(
         (item) => item.product_id === product.id
      );

      // ✅ If already exists, do nothing (no quantity increase)
      if (!exists) {
         currentCart.push({
            product_id: product.id,
            name: product.name,
            image: product.image,
            price: product.sale_price && product.sale_price < product.price
               ? product.sale_price
               : product.price,
            quantity: 1,
         });
      }

      saveCart(currentCart);
      setCart([...currentCart]);
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

   // ✅ Badge count = number of unique products
   const totalItems = cart.length;

   // ✅ No quantity multiplication
   const totalPrice = cart.reduce(
      (sum, item) => sum + Number(item.price),
      0
   );

   return (
      <CartContext.Provider
         value={{
            cart,
            addToCart,
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