import { createContext, useContext, useState } from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addMovie = (newMovie) => {
    const isMovieInCart = items.some((movie) => movie.id === newMovie.id);

    if (!isMovieInCart) {
      setItems([...items, newMovie]);
    } else {
      console.log("Movie is already in the cart");
    }
  };
  const removeMovie = (movieId) => {
    const updatedItems = items.filter((movie) => movie.id !== movieId);
    setItems(updatedItems);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addMovie,
        removeMovie,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};
