import { RiMovie2Line } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiUserCircleLight } from "react-icons/pi";

export const Navbar = () => {
  return (
    <div className="header bg-darkblue py-2 px-10 flex justify-between">
      <div className="text-2xl text-white flex items-center gap-2">
        <RiMovie2Line className="text-yellow" />
        CineFlix
      </div>
      <div className="icons text-darkgrey flex items-center gap-4 text-2xl">
        <IoIosNotificationsOutline className="" />
        <PiShoppingCartLight />
        <PiUserCircleLight />
      </div>
    </div>
  );
};
