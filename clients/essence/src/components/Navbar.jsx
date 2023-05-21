import React, { useState } from "react";
import styles from "../style";
import Cart from "./Cart";

const navLinks = [
  { id: "home", title: "Home" },
  { id: "product", title: "Product" },
  { id: "reels", title: "Reels" },
];
const navItemStyle =
  "cursor-pointer hover:text-dimBlack text-[16px] font-poppins font-normal";

const Navbar = ({ page }) => {
  const [isOpen, setIsOpen] = useState(false);
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
              setIsOpen((prev) => !prev);
            }}
            className="cursor-pointer"
          >
            {isOpen ? "close" : "open"}
          </p>
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } bg-dirt-white py-6 absolute top-20 right-5 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex flex-col items-center  flex-1 px-3">
              {navLinks.map((navItem, index) => (
                <div
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
      <div className="relative flex justify-end">
        <div className="fixed right-0 z-40 h-full w-[300px] bg-slate-600 drop-shadow-xl ">
          ss
        </div>
      </div>
    </div>
  );
};

export default Navbar;
