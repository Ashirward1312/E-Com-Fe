export const getCart = () => {
   return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
   localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product, quantity = 1) => {
   const cart = getCart();

   const index = cart.findIndex(
      (item) => item.product_id === product.id
   );

   if (index >= 0) {
      cart[index].quantity += quantity;
   } else {
      cart.push({
         product_id: product.id,
         name: product.name,
         image: product.image,
         price: product.price,
         quantity,
      });
   }

   saveCart(cart);
};

export const removeFromCart = (productId) => {
   const cart = getCart().filter(
      (item) => item.product_id !== productId
   );

   saveCart(cart);
};

export const clearCart = () => {
   localStorage.removeItem("cart");
};

export const updateCartQuantity = (productId, quantity) => {
   const cart = getCart();

   const updatedCart = cart.map((item) =>
      item.product_id === productId
         ? { ...item, quantity }
         : item
   );

   saveCart(updatedCart);
};

export const getCartTotalItems = () => {
   const cart = getCart();

   return cart.reduce(
      (total, item) => total + item.quantity,
      0
   );
};

export const getCartTotalPrice = () => {
   const cart = getCart();

   return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
   );
};