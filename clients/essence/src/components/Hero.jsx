import React from "react";
import { es_ring, es_chain } from "../assets";
import SquareItem from "./ItemDetails";
import ItemDetails from "./ItemDetails";
import useStyle from "../hooks/useStyle";

const h1Style =
  "font-poppins font-normal max-w-[600px] md:text-[72px] text-[52px]  text-black  w-full";

const Hero = () => {
  const { style } = useStyle();
  return (
    <section
      id="home"
      className="flex sm:flex-row flex-col gap-6 sm:py-16 py-6 "
    >
      {/* TEXT */}
      <div className="flex flex-col justify-start items-start  flex-1 w-full mb-6 ">
        <h1 className={h1Style}>Luxury jewelry at your doorstep</h1>
        <p className={`${style.paragraph} max-w-[500px] mt-5`}>
          Discover stunning jewelry crafted with the finest materials. Shop our
          stunning collection from the comfort of your own home and elevate your
          style.
        </p>
        <button className="mt-5 mb-5 py-4 px-6 cta-button font-poppins font-normal text-[16px] rounded-[10px] text-white">
          Browse Our Colletion
        </button>
      </div>
      {/* IMG */}
      <div className="hero-panel ">
        {/* LONG ITEM */}
        <div
          className="long-item flex bg-cover items-end px-2 py-2 rounded-[8px] min-h-[350px] box-shadow w-[250px]"
          style={{ backgroundImage: `url(${es_chain})` }}
        >
          <ItemDetails name={"Essence Ring"} about={"Ring"} price={"#750"} />
        </div>

        {/* STACKED ITEMS */}
        <div
          className="md:flex  hidden  bg-cover  items-end px-2 py-2 rounded-[8px] min-h-[200px] box-shadow w-[250px]"
          style={{ backgroundImage: `url(${es_chain})` }}
        >
          <ItemDetails name={"Essence Chain"} about={"Chain"} price={"#1050"} />
        </div>
        <div
          className="md:flex hidden bg-cover items-end px-2 py-2 rounded-[8px] min-h-[200px] box-shadow w-[250px]"
          style={{ backgroundImage: `url(${es_chain})` }}
        >
          <ItemDetails name={"Essence Chain"} about={"Chain"} price={"#1050"} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
