import { RiMovie2Line } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import { useState } from "react";
import Cart from "./Cart";
import { useCartContext } from "../CartContext";

export const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const { items } = useCartContext();

  const openCart = () => {
    setShowCart(true);
  };
  const closeCart = () => {
    setShowCart(false);
  };
  return (
    <div className="header bg-darkblue py-3 px-4 sm:px-10 flex justify-between items-center fixed w-full">
      <div className="text-2xl text-white flex items-center gap-2">
        <RiMovie2Line className="text-yellow" />
        CineFlix
      </div>
      <div className="icons text-darkgrey flex items-center gap-4 text-2xl">
        <IoIosNotificationsOutline className="" />
        <div className="relative">
          <div onClick={openCart} className="cursor-pointer">
            <PiShoppingCartLight
              className={`${showCart ? "text-white" : "text-inherit"}`}
            />
          </div>
          {items.length > 0 && (
            <div className="cart-counter absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-yellow text-darkblue rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {items.length}
            </div>
          )}
        </div>
        <PiUserCircleLight />
      </div>
      {showCart ? <Cart closeCart={closeCart} /> : ""}
    </div>
  );
};
