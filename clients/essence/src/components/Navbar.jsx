import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import useStyle from "../hooks/useStyle";
import { useDispatch, useSelector } from "react-redux";
import CartPanel from "./CartPanel";

const navLinks = [
  { id: "home", title: "Home" },
  { id: "product", title: "Product" },
  { id: "reels", title: "Reels" },
];
const navItemStyle =
  "cursor-pointer hover:text-dimBlack text-[16px] font-poppins font-normal";

const Navbar = ({ page }) => {
  const { style } = useStyle();
  const isCartOpen = useSelector((state) => state.isCartOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav
        className={`sticky w-full flex py-6 justify-between items-center navbar mt-6`}
      >
        <div className="font-semibold text-[24px]">ESSENCE</div>
        <ul className="list-none sm:flex hidden flex-row items-center justify-end flex-1 relative">
          {navLinks.map((navItem) => (
            <li
              key={navItem.id}
              className={`mr-[40px] hover:-translate-y-px  ${navItemStyle} ${
                navItem.id === page ? "border-b-[1px] border-b-black" : ""
              }`}
              role="button"
              tabIndex={0}
            >
              <a href={`/${navItem.id}`}>{navItem.title}</a>
            </li>
          ))}
          <li className={`ml-[40px] ${navItemStyle}`}>
            <Cart />
          </li>
        </ul>
        {/* MOBILE */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <p
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            className="cursor-pointer"
          >
            {isMenuOpen ? "close menu" : "open menu"}
          </p>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } bg-dirt-white py-6 absolute top-20 right-5 mx-4 my-2 min-w-[140px] rounded-xl sidebar `}
          >
            <ul className="list-none flex flex-col items-center  flex-1 px-3">
              {navLinks.map((navItem, index) => (
                <div
                  role="button"
                  tabIndex={0}
                  key={navItem.id}
                  className={`${
                    index !== navLinks.length - 1 ? "mb-[30px]" : "mb-0"
                  } ${
                    navItem.id === page ? "text-red-700" : ""
                  }  border-b-[1px] border-black flex items-center justify-center  w-full`}
                >
                  <li className={` ${navItemStyle}`}>
                    <a href={`/${navItem.id}`}>{navItem.title}</a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className={`ml-[30divx] ${navItemStyle}`}>
            <Cart />
          </div>
        </div>
      </nav>
      {isCartOpen && <CartPanel />}
    </div>
  );
};

export default Navbar;
