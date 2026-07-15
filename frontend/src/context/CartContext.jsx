import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    const existingItem = cart.find((food) => food.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((food) =>
          food.id === item.id
            ? { ...food, quantity: food.quantity + quantity }
            : food
        )
      );
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };




  // INCREASE QUANTITY
  const increaseQuantity = (id) => {

    setCart(
      cart.map((food) =>
        food.id === id
          ? {
              ...food,
              quantity: food.quantity + 1
            }
          : food
      )
    );

  };


  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {

    setCart(
      cart.map((food) =>
        food.id === id && food.quantity > 1
          ? {
              ...food,
              quantity: food.quantity - 1
            }
          : food
      )
    );

  };
  const removeFromCart = (id) => {
    setCart(cart.filter((food) => food.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
          increaseQuantity,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}