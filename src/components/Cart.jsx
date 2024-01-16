import { useCartContext } from "../CartContext";
import { IoMdClose } from "react-icons/io";
import { PiShoppingCartBold } from "react-icons/pi";
import { BsCartX } from "react-icons/bs";

const Cart = ({ closeCart }) => {
  const { items, removeMovie } = useCartContext();

  const calculateTotal = () => {
    return items.reduce((total, movie) => total + movie.price, 0);
  };

  return (
    <div className="fixed top-12 left-1/2 sm:left-auto sm:max-w-sm transform -translate-x-1/2  sm:transform-none sm:-translate-x-0 bottom-4 bg-[#1f2937] p-4 w-full sm:right-20 md:w-1/3 max-w-xs border border-darkblue2 rounded h-fit text-[#6b7280] z-50">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl">Your cart is empty.</p>
          <BsCartX className="text-4xl" />

          <button
            className="absolute top-2 right-2 text-darkgrey focus:outline-none text-2xl"
            onClick={closeCart}
          >
            <IoMdClose className="text-2xl" />
          </button>
        </div>
      ) : (
        <>
          {items.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center justify-between mb-4 border-b pb-4 border-darkblue2"
            >
              <div className="flex">
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-12 h-12 rounded mr-2"
                />
                <div>
                  <p className="text-[#e6e8e9]">{movie.title}</p>
                  <p className="">${movie.price}</p>
                </div>
              </div>
              <button
                className="focus:outline-none"
                onClick={() => removeMovie(movie.id)}
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <div className="number-wrapper flex flex-col gap-1">
              Number of movies
              <span className="text-lg">{items.length}</span>
            </div>
            <div className="pricing-wrapper flex flex-col gap-1">
              Total Cost
              <span className="text-[#e6e8e9] text-lg">
                ${calculateTotal()}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <button className="bg-yellow text-[#1e2c34] p-2 rounded font-medium flex items-center justify-center gap-1">
              <PiShoppingCartBold className="text-xl" />
              Checkout
            </button>
            <button
              className="p-2 rounded font-medium border border-darkblue2 text-[#e6e8e9]"
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
