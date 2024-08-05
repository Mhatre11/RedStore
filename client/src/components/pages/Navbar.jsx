import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-around px-4 py-4 uppercase bg-white shadow-md">
      {/* Menu Icon (Optional, adjust based on your design) */}
      <div className="mr-4 md:hidden">
        <MdOutlineMenu className="text-gray-700 hover:text-black" />
      </div>

      {/* Logo */}
      <div className="flex items-center">
        <h1>
          <Link to="/" className="text-xl font-bold text-black">
            30DC Shop
          </Link>
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className=" hidden md:flex gap-6 justify-center items-center ">
        <li>
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-green-600"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-green-600"
          >
            Login or Register
          </Link>
        </li>
        <li>
          <MdClose size={20}  className="hidden"/>
        </li>
      </ul>

      {/* Cart Icon */}
      <div className="relative flex items-center ml-4">
        <Link to="/cart">
          <MdOutlineShoppingCart
            size={30}
            className="text-gray-700 hover:text-black z-10"
          />
        </Link>
        <span className="absolute bottom-0 -translate-y-1/2 right-0 -mr-3 px-1 bg-blue-200 rounded-full  font-semibold">
          0
        </span>
       
      </div>
    </nav>
  );
};

export default Navbar;
