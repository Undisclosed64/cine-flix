import { RiMovie2Line } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import { useState } from "react";
import Cart from "./Cart";

export const Navbar = () => {
  const [showCart, setShowCart] = useState(false);

  const openCart = () => {
    setShowCart(true);
  };
  const closeCart = () => {
    setShowCart(false);
  };
  return (
    <div className="header bg-darkblue py-2 px-4 sm:px-10 flex justify-between">
      <div className="text-2xl text-white flex items-center gap-2">
        <RiMovie2Line className="text-yellow" />
        CineFlix
      </div>
      <div className="icons text-darkgrey flex items-center gap-4 text-2xl">
        <IoIosNotificationsOutline className="" />
        <PiShoppingCartLight onClick={openCart} />
        <PiUserCircleLight />
      </div>
      {showCart ? <Cart closeCart={closeCart} /> : ""}
    </div>
  );
};
