import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item, quantity) => {
    const existingItem = cart.find(
      (food) => food._id === item._id
    );

    if (existingItem) {
      setCart(
        cart.map((food) =>
          food._id === item._id
            ? {
                ...food,
                quantity: food.quantity + quantity,
              }
            : food
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity,
        },
      ]);
    }
  };

  // Increase quantity
  const increaseQuantity = (_id) => {
    setCart(
      cart.map((food) =>
        food._id === _id
          ? {
              ...food,
              quantity: food.quantity + 1,
            }
          : food
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (_id) => {
    setCart(
      cart.map((food) =>
        food._id === _id && food.quantity > 1
          ? {
              ...food,
              quantity: food.quantity - 1,
            }
          : food
      )
    );
  };

  // Remove item
  const removeFromCart = (_id) => {
    setCart(
      cart.filter((food) => food._id !== _id)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}